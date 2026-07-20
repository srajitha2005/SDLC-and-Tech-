import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Algorithms', code: 'CS102', credits: 3, gradeStatus: 'pending' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Step 107/Hint: assert no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Step 107: test getCourses()
  it('should fetch courses via GET', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  // Step 108: test error handling
  it('should handle error gracefully on 500 status', () => {
    const errorMessage = 'Internal Server Error';
    
    service.getCourses().subscribe({
      next: () => expect.fail('expected an error, not courses'),
      error: (error) => {
        expect(error.message).toContain('Failed to load courses. Please try again.');
      }
    });

    // Since CourseService has retry(2), it will retry twice on failure (total 3 requests)
    const req1 = httpMock.expectOne('http://localhost:3000/courses');
    req1.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });

    const req2 = httpMock.expectOne('http://localhost:3000/courses');
    req2.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });

    const req3 = httpMock.expectOne('http://localhost:3000/courses');
    req3.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});

