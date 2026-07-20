import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth-interceptor';
import { errorHandlerInterceptor } from './interceptors/error-handler-interceptor';
import { loadingInterceptor } from './interceptors/loading-interceptor';

import { courseReducer } from './store/course/course.reducer';
import { enrollmentReducer } from './store/enrollment/enrollment.reducer';
import { CourseEffects } from './store/course/course.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Step 78: provideHttpClient enables HttpClient app-wide
    // Step 88: withInterceptors registers functional interceptors
    provideHttpClient(
      withInterceptors([authInterceptor, errorHandlerInterceptor, loadingInterceptor])
    ),
    // Step 92: Configure NgRx Store
    provideStore({
      course: courseReducer,
      enrollment: enrollmentReducer
    }),
    // Step 97: Configure NgRx Effects
    provideEffects([CourseEffects]),
    // Step 92: Configure NgRx DevTools for debugging state
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};


