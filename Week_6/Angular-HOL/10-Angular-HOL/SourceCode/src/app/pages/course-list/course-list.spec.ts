import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CourseList } from './course-list';
import { Course } from '../../models/course.model';

describe('CourseList', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Algorithms', code: 'CS102', credits: 3, gradeStatus: 'pending' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [
        provideMockStore({
          initialState: {
            course: {
              courses: mockCourses,
              loading: false,
              error: null
            },
            enrollment: {
              enrolledCourseIds: []
            }
          }
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: () => null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  // Step 102: component is created
  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // Step 109: assert the rendered course cards match initial state
  it('should render course cards based on store state', () => {
    fixture.detectChanges();
    
    const cardElements = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(cardElements.length).toBe(2);
  });

  // Step 110: update state to loading and verify loading indicator is visible
  it('should display loading message when loading is true', () => {
    store.setState({
      course: {
        courses: [],
        loading: true,
        error: null
      },
      enrollment: {
        enrolledCourseIds: []
      }
    });
    
    fixture.detectChanges();
    
    const loadingEl = fixture.debugElement.query(By.css('.loading-msg'));
    expect(loadingEl).toBeTruthy();
    expect(loadingEl.nativeElement.textContent).toContain('Loading courses...');
  });
});

