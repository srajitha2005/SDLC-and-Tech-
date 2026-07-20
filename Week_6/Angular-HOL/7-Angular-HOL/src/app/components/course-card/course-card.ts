import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { EnrollmentService } from '../../services/enrollment';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnChanges {
  @Input() course!: Course;

  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  constructor(public enrollmentService: EnrollmentService) {}

  // Getters keep templates clean by moving complex conditional logic out of the HTML and into the component class.
  // This makes the template easier to read and allows the logic to be unit tested more easily.
  get cardClasses() {
    return {
      'card--enrolled': this.enrollmentService.isEnrolled(this.course?.id),
      'card--full': this.course?.credits >= 4,
      'expanded': this.isExpanded
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('Previous value:', changes['course'].previousValue);
      console.log('Current value:', changes['course'].currentValue);
    }
  }

  enroll() {
    if (this.enrollmentService.isEnrolled(this.course.id)) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course.id);
    }
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}