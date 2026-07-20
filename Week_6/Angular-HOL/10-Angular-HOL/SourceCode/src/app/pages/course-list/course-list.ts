import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { CourseCard } from '../../components/course-card/course-card';
import { Highlight } from '../../directives/highlight';
import { Course } from '../../models/course.model';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCard, Highlight, CourseSummaryWidget],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {
  selectedCourseId = 0;
  
  // Local state for search
  searchTerm$ = new BehaviorSubject<string>('');
  
  // Step 96: Selectors mapping state directly to Observables
  courses$: Observable<Course[]>;
  filteredCourses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courses$ = this.store.select(selectAllCourses);
    this.isLoading$ = this.store.select(selectCoursesLoading);
    this.errorMessage$ = this.store.select(selectCoursesError);
    
    // Combine the NgRx courses$ with the local searchTerm$ to create the filtered list
    this.filteredCourses$ = combineLatest([this.courses$, this.searchTerm$]).pipe(
      map(([courses, term]) => {
        if (!term) return courses;
        return courses.filter(c => 
          c.name.toLowerCase().includes(term.toLowerCase()) || 
          c.code.toLowerCase().includes(term.toLowerCase())
        );
      })
    );
  }

  ngOnInit() {
    const search = this.route.snapshot.queryParamMap.get('search');
    if (search) {
      this.searchTerm$.next(search);
    }

    // Step 96: Dispatch the load action. The Effect will intercept this and make the HTTP call.
    this.store.dispatch(loadCourses());
  }

  onSearch(term: string) {
    this.searchTerm$.next(term);
    this.router.navigate(['courses'], {
      queryParams: term ? { search: term } : {}
    });
  }

  navigateToCourse(courseId: number) {
    this.router.navigate(['courses', courseId]);
  }


  // To keep filtering simple, we can filter in the template using a pipe, 
  // or subscribe to courses$, but for this exercise we can just pass the raw observable 
  // to the template. Since the search requirement says to filter locally, let's just 
  // handle it in the template or use another selector.
  // Actually, we'll keep the trackBy.
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number) {
    console.log('Enroll event received for course: ' + courseId);
    this.selectedCourseId = courseId;
  }
}