import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CoursesLayout } from './pages/courses-layout/courses-layout';
import { CourseList } from './pages/course-list/course-list';
import { CourseDetail } from './pages/course-detail/course-detail';
import { StudentProfile } from './pages/student-profile/student-profile';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  // Step 68: Home route
  {
    path: '',
    component: Home
  },

  // Step 72: Nested routes under /courses — CoursesLayout is the shell with <router-outlet>
  {
    path: 'courses',
    component: CoursesLayout,
    children: [
      // Step 68: /courses → CourseListComponent
      { path: '', component: CourseList },
      // Step 68 & 69: /courses/:id → CourseDetailComponent (reads :id via ActivatedRoute)
      { path: ':id', component: CourseDetail }
    ]
  },

  // Step 68 & 76: Profile route protected by authGuard (CanActivate)
  {
    path: 'profile',
    component: StudentProfile,
    canActivate: [authGuard]
  },

  // Step 73 & 76: Enrollment feature — lazily loaded standalone routes chunk.
  // The JS bundle for enrollment is only downloaded when user first visits /enroll.
  // Also protected by authGuard.
  {
    path: 'enroll',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/enrollment/enrollment.routes').then(m => m.ENROLLMENT_ROUTES)
  },

  // Step 68: Wildcard route — must be LAST so it only catches unmatched paths
  {
    path: '**',
    component: NotFound
  }

];