import { HttpInterceptorFn } from '@angular/common/http';

// Step 88: Auth interceptor — clones every outgoing HTTP request and attaches a Bearer token.
// Interceptors run in order of registration in app.config.ts.
// The request goes through interceptors in registration order; responses come back in reverse.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer mock-token-12345'
    }
  });
  return next(authReq);
};

