import { CanDeactivateFn } from '@angular/router';

// Step 77: Interface that the component must implement so the guard can call canDeactivate()
export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

// Step 77: CanDeactivate guard — called before navigating away from a component.
// If the form is dirty (modified but unsaved), it shows a confirmation dialog.
// Returning true allows navigation; returning false keeps the user on the page.
export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  return component.canDeactivate() || window.confirm('You have unsaved changes. Leave?');
};
