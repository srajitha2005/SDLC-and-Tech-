import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth-interceptor';
import { errorHandlerInterceptor } from './interceptors/error-handler-interceptor';
import { loadingInterceptor } from './interceptors/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Step 78: provideHttpClient enables HttpClient app-wide (standalone alternative to HttpClientModule)
    // Step 88: withInterceptors registers functional interceptors in order:
    //   1. authInterceptor adds Authorization header to every request
    //   2. errorHandlerInterceptor handles 401/500 globally
    //   3. loadingInterceptor shows/hides the global loading spinner
    provideHttpClient(
      withInterceptors([authInterceptor, errorHandlerInterceptor, loadingInterceptor])
    )
  ]
};

