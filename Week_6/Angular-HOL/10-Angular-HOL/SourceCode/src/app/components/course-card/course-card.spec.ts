import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { SimpleChange } from '@angular/core';
import { CourseCard } from './course-card';
import { Course } from '../../models/course.model';

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;
  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        provideMockStore({
          initialState: {
            enrollment: { enrolledCourseIds: [] }
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
  });

  // Step 102: component is created
  it('should create', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // Step 103: Test @Input rendering
  it('should render course name in h3', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    const h3Element = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(h3Element.textContent).toContain('Data Structures');
  });

  // Step 104: Test @Output emit
  it('should emit enrollRequested when button is clicked', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    
    vi.spyOn(component.enrollRequested, 'emit');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();
    
    expect(component.enrollRequested.emit).toHaveBeenCalledWith(mockCourse.id);
  });

  // Step 105: Test ngOnChanges
  it('should call console.log inside ngOnChanges', () => {
    vi.spyOn(console, 'log');
    component.course = mockCourse;
    
    const changes = {
      course: new SimpleChange(null, mockCourse, true)
    };
    component.ngOnChanges(changes);
    
    expect(console.log).toHaveBeenCalled();
  });
});


