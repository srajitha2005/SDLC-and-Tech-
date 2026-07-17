import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Step 75: Hardcoded for now — set to true to allow access, false to test redirection
  isLoggedIn = true;
}

