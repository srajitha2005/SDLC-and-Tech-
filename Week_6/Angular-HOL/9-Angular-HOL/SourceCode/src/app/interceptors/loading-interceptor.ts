import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading';

// Step 91: Loading interceptor — shows global spinner before each HTTP request
// and hides it when the request finishes (success OR error).
// finalize runs in both complete and error cases — the RxJS equivalent of try/catch/finally.
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.show();

  return next(req).pipe(
    finalize(() => loadingService.hide())
  );
};
