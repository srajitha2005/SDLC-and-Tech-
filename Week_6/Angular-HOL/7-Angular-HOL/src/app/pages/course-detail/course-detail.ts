import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetail implements OnInit {
  course: Course | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    // Step 69: Read the :id route parameter using snapshot.paramMap
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.course = this.courseService.getCourseById(id);
  }

  goBack() {
    this.router.navigate(['/courses']);
  }
}

