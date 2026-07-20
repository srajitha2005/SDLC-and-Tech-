import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // Step 91: BehaviorSubject holds the current loading state.
  // Components can subscribe to isLoading$ to reactively show/hide a spinner.
  private _isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading.asObservable();

  show(): void {
    this._isLoading.next(true);
  }

  hide(): void {
    this._isLoading.next(false);
  }
}

