import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Course } from '../../models/course.model';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnInit, OnChanges {
  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;
  
  // Step 100: Observable for enrolled status of THIS specific course
  isEnrolled$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // We initialize this in ngOnInit because this.course is guaranteed to be populated here
    this.isEnrolled$ = this.store.select(selectEnrolledIds).pipe(
      map(ids => ids.includes(this.course.id))
    );
  }

  get cardClasses() {
    return {
      'card--enrolled': false, // Logic migrated to observable usage
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

  // Step 100: Dispatch actions instead of calling service
  onEnrollClick(isEnrolled: boolean) {
    if (isEnrolled) {
      this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
    } else {
      this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
      // Optionally still emit to parent if it needs to know, but parent can also use NgRx
      this.enrollRequested.emit(this.course.id);
    }
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}