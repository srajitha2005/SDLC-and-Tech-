import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError, retry, switchMap } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  // Step 78: Inject HttpClient
  constructor(private http: HttpClient) {}

  // Steps 79, 83-86: GET all courses with full RxJS operator chain
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      // Step 83: map filters out any courses with no credits
      map(courses => courses.filter(c => c.credits > 0)),
      // Step 85: tap is used for side effects (logging) — it does NOT modify the stream.
      // Never use tap to transform data; use map for that.
      tap(courses => console.log('Courses loaded:', courses.length)),
      // Step 86: retry(2) re-attempts the HTTP request up to 2 times on failure before propagating error
      retry(2),
      // Step 84: catchError handles failures and returns a user-friendly error Observable
      catchError(err => {
        console.error('CourseService.getCourses error:', err);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  // Step 79: GET single course by ID
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error('CourseService.getCourseById error:', err);
        return throwError(() => new Error(`Failed to load course ${id}.`));
      })
    );
  }

  // Step 81: POST — create a new course
  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      tap(created => console.log('Course created:', created)),
      catchError(err => throwError(() => new Error('Failed to create course.')))
    );
  }

  // Step 82: PUT — update an existing course
  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course).pipe(
      tap(updated => console.log('Course updated:', updated)),
      catchError(err => throwError(() => new Error('Failed to update course.')))
    );
  }

  // Step 82: DELETE — remove a course
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('Course deleted:', id)),
      catchError(err => throwError(() => new Error('Failed to delete course.')))
    );
  }

  // Step 87: switchMap example — load students for a selected course.
  // switchMap cancels any previous in-flight inner Observable when a new courseId arrives,
  // preventing stale/out-of-order responses (critical for search/typeahead patterns).
  getStudentsByCourse(courseId$: Observable<number>): Observable<any[]> {
    return courseId$.pipe(
      switchMap(courseId =>
        this.http.get<any[]>(`http://localhost:3000/students?courseId=${courseId}`)
      ),
      catchError(err => throwError(() => new Error('Failed to load students.')))
    );
  }
}

