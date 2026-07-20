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

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnChanges {
  @Input() course!: { id: number; name: string; code: string; credits: number; gradeStatus: string; isEnrolled: boolean };

  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  // Getters keep templates clean by moving complex conditional logic out of the HTML and into the component class.
  // This makes the template easier to read and allows the logic to be unit tested more easily.
  get cardClasses() {
    return {
      'card--enrolled': this.course?.isEnrolled,
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
    this.enrollRequested.emit(this.course.id);
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}