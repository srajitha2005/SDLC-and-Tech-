import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetail implements OnInit {
  course: Course | undefined;
  students: any[] = [];
  errorMessage = '';

  // Step 87: Subject used to emit courseId changes for switchMap chaining
  private courseId$ = new Subject<number>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Step 79: Subscribe to Observable-based getCourseById
    this.courseService.getCourseById(id).subscribe({
      next: course => this.course = course,
      error: err => this.errorMessage = err.message
    });

    // Step 87: switchMap — when courseId$ emits a new value, the previous student HTTP call
    // is automatically cancelled and a new one starts. This prevents stale/out-of-order responses.
    this.courseService.getStudentsByCourse(this.courseId$).subscribe({
      next: students => this.students = students,
      error: err => console.error(err.message)
    });

    // Emit the initial courseId to trigger the switchMap
    this.courseId$.next(id);
  }

  goBack() {
    this.router.navigate(['/courses']);
  }
}


