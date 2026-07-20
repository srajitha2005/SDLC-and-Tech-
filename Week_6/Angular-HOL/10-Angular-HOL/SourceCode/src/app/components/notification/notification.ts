import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification';

// Step 67: NotificationService is provided at the COMPONENT level using providers: [NotificationService]
// in the @Component decorator below. This creates a NEW, SEPARATE instance of NotificationService
// that is scoped exclusively to this component and its children — it is NOT the same instance as any
// root-level or other component-level provider. This is useful when you need isolated state per
// component instance (e.g., a form wizard, a dialog box, or a notification area that should not
// share messages with other parts of the app).
// contrast: providedIn: 'root' creates ONE singleton shared across the entire app tree.
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
  providers: [NotificationService]  // Component-level provider — creates a new instance scoped to this component
})
export class NotificationComponent {
  newMessage = '';

  constructor(public notificationService: NotificationService) {}

  addMsg() {
    if (this.newMessage.trim()) {
      this.notificationService.addMessage(this.newMessage.trim());
      this.newMessage = '';
    }
  }
}

