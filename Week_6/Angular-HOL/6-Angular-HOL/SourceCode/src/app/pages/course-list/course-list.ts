import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';
import { Highlight } from '../../directives/highlight';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCard, Highlight, CourseSummaryWidget],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {
  selectedCourseId = 0;
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courses = this.courseService.getCourses();
  }

  // trackBy improves performance by helping Angular identify which items in an iterable have changed, been added, or been removed.
  // Instead of re-rendering the entire list, Angular can track items by their unique identifier (like course.id) and only update DOM elements that actually changed.
  trackByCourseId(index: number, course: any): number {
    return course.id;
  }

  onEnroll(courseId: number) {
    console.log('Enroll event received for course: ' + courseId);
    this.selectedCourseId = courseId;
  }
}