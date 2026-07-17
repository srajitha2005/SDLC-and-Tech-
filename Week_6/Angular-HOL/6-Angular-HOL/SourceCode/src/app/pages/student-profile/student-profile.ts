import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment';
import { NotificationComponent } from '../../components/notification/notification';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile {
  constructor(public enrollmentService: EnrollmentService) {}
}

