import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

// Step 90: Global error handler interceptor.
// Intercepts HTTP error responses and handles them centrally:
//   - 401 Unauthorized → redirects to home (simulating login redirect)
//   - 500 Server Error → logs a global error notification
// After handling, re-throws so components can still react if needed.
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('Unauthorized (401) — redirecting to home');
        router.navigate(['/']);
      } else if (error.status === 500) {
        console.error('Server Error (500) — please try again later');
      } else {
        console.error(`HTTP Error ${error.status}:`, error.message);
      }
      return throwError(() => error);
    })
  );
};
