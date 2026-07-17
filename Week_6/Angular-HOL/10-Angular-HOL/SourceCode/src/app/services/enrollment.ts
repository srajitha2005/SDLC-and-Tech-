import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrollmentApiUrl = 'http://localhost:3000/enrollments';
  private enrolledCourseIds: number[] = [];

  // Step 78: Inject HttpClient (CourseService removed — no longer needed for sync lookup)
  constructor(private http: HttpClient) {}

  // --- In-memory toggle methods (used by CourseCard for real-time UI state) ---

  enroll(courseId: number): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): any[] {
    return this.enrolledCourseIds.map(id => ({ id }));
  }

  // --- HTTP-based enrollment methods (persists to json-server) ---

  // Step 81: POST an enrollment record to the API
  createEnrollment(studentId: number, courseId: number): Observable<any> {
    return this.http.post(this.enrollmentApiUrl, { studentId, courseId }).pipe(
      tap(e => console.log('Enrollment created:', e)),
      catchError(err => throwError(() => new Error('Failed to create enrollment.')))
    );
  }

  // Step 87: GET students enrolled in a specific course (used with switchMap in CourseDetail)
  getStudentsByCourse(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/students?courseId=${courseId}`).pipe(
      catchError(err => throwError(() => new Error('Failed to load students for course.')))
    );
  }
}

