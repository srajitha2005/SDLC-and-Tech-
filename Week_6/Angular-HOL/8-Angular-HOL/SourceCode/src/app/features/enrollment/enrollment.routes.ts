import { Routes } from '@angular/router';
import { EnrollmentForm } from '../../pages/enrollment-form/enrollment-form';
import { ReactiveEnrollmentForm } from '../../pages/reactive-enrollment-form/reactive-enrollment-form';
import { unsavedChangesGuard } from '../../guards/unsaved-changes-guard';

// Step 73: Enrollment feature routes — lazily loaded via loadChildren in app.routes.ts.
// This file is the standalone equivalent of an NgModule with routing.
// Only this chunk is downloaded when the user first navigates to /enroll.
export const ENROLLMENT_ROUTES: Routes = [
  {
    path: '',
    component: EnrollmentForm
  },
  {
    path: 'reactive',
    component: ReactiveEnrollmentForm,
    // Step 77: CanDeactivate guard — warns user if reactive form has unsaved changes
    canDeactivate: [unsavedChangesGuard]
  }
];
