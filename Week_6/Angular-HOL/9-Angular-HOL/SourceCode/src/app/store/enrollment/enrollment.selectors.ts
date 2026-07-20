import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.reducer';
import { selectAllCourses } from '../course/course.selectors';
import { Course } from '../../models/course.model';

export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollment');

export const selectEnrolledIds = createSelector(
  selectEnrollmentState,
  (state: EnrollmentState) => state.enrolledCourseIds
);

// Step 99: Cross-slice selector combining course and enrollment state.
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledIds,
  (allCourses: Course[], enrolledIds: number[]) => {
    return allCourses.filter(course => enrolledIds.includes(course.id));
  }
);
