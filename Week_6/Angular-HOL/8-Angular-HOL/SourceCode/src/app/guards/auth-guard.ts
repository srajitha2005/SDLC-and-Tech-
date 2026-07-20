import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

// Step 75: CanActivate guard — checks if the user is logged in before allowing route access.
// If isLoggedIn is false, it redirects to the home page and blocks navigation.
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }

  router.navigate(['/']);
  return false;
};

