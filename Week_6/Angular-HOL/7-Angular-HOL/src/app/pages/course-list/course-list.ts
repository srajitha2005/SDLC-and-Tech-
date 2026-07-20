import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseCard } from '../../components/course-card/course-card';
import { Highlight } from '../../directives/highlight';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCard, Highlight, CourseSummaryWidget],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {
  selectedCourseId = 0;
  courses: Course[] = [];
  searchTerm = '';

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.courses = this.courseService.getCourses();

    // Step 71: Read the search query param from the URL on load (e.g. /courses?search=angular)
    const search = this.route.snapshot.queryParamMap.get('search');
    if (search) {
      this.searchTerm = search;
    }
  }

  // Step 71: Update URL query param when user searches
  onSearch() {
    this.router.navigate(['courses'], {
      queryParams: this.searchTerm ? { search: this.searchTerm } : {}
    });
  }

  // Step 70: Navigate programmatically to /courses/:id on card click
  navigateToCourse(courseId: number) {
    this.router.navigate(['courses', courseId]);
  }

  get filteredCourses(): Course[] {
    if (!this.searchTerm) return this.courses;
    return this.courses.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // trackBy improves performance by helping Angular identify which items in an iterable have changed, been added, or been removed.
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number) {
    console.log('Enroll event received for course: ' + courseId);
    this.selectedCourseId = courseId;
  }
}