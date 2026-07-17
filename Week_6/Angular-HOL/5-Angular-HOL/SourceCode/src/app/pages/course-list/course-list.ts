import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';
import { Highlight } from '../../directives/highlight';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCard, Highlight],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {
  selectedCourseId = 0;

  courses = [
    { id: 1, name: 'Angular', code: 'ANG101', credits: 4, gradeStatus: 'passed', isEnrolled: false },
    { id: 2, name: 'Java', code: 'JAVA201', credits: 4, gradeStatus: 'pending', isEnrolled: true },
    { id: 3, name: 'Spring Boot', code: 'SB301', credits: 3, gradeStatus: 'passed', isEnrolled: true },
    { id: 4, name: 'SQL', code: 'SQL101', credits: 3, gradeStatus: 'failed', isEnrolled: false },
    { id: 5, name: 'AWS', code: 'AWS401', credits: 2, gradeStatus: 'pending', isEnrolled: false }
  ];

  ngOnInit() {
    // Courses load immediately now
  }

  // trackBy improves performance by helping Angular identify which items in an iterable have changed, been added, or been removed.
  // Instead of re-rendering the entire list, Angular can track items by their unique identifier (like course.id) and only update DOM elements that actually changed.
  trackByCourseId(index: number, course: any): number {
    return course.id;
  }

  onEnroll(courseId: number) {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
    
    const course = this.courses.find(c => c.id === courseId);
    if (course) {
      course.isEnrolled = true;
    }
  }
}