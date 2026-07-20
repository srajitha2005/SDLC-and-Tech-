import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {

  // [property] (one-way binding) propagates values from the component class to the DOM.
  // [(ngModel)] (two-way binding) synchronizes values in both directions, so changes in the DOM input update the component, and vice versa.
  portalName = 'Student Course Portal';

  isPortalActive = true;

  message = '';

  searchTerm = '';

  coursesAvailable = 0;

  ngOnInit(): void {
    this.coursesAvailable = 12; // Simulate fetching course count
    console.log('HomeComponent initialised — courses loaded');
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }

}