import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAllCourses } from '../../store/course/course.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {

  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  coursesAvailable = 0;
  
  private sub?: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Read directly from the NgRx store using the selector
    this.sub = this.store.select(selectAllCourses).subscribe(courses => {
      this.coursesAvailable = courses.length;
    });
    console.log('HomeComponent initialised — course state observed');
  }


  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    console.log('HomeComponent destroyed');
  }

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }

}