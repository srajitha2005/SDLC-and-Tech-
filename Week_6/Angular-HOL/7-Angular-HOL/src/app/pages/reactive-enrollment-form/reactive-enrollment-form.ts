import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { CanComponentDeactivate } from '../../guards/unsaved-changes-guard';

// 53. Custom synchronous validator
function noCourseCode(control: AbstractControl): ValidationErrors | null {
  if (control.value && typeof control.value === 'string' && control.value.toUpperCase().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

// 55. Custom asynchronous validator
function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      if (control.value && typeof control.value === 'string' && control.value.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css',
})
export class ReactiveEnrollmentForm implements OnInit, CanComponentDeactivate {
  enrollForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  // Step 77: Called by unsavedChangesGuard before navigation.
  // Returns true (allow navigation) if the form is clean; false triggers the confirm dialog.
  canDeactivate(): boolean {
    return !this.enrollForm.dirty;
  }

  ngOnInit() {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheck]],
      courseId: ['', [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([])
    });
  }

  // 57. Typed getter for FormArray
  // This getter is better than casting in the template because it provides type safety in the TypeScript code
  // and keeps the template clean. Casting directly in the template (e.g. `as FormArray`) is not possible in Angular templates.
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse() {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number) {
    this.additionalCourses.removeAt(index);
  }

  onSubmit() {
    // 52. Difference between .value and .getRawValue():
    // .value only returns an object containing the values of currently enabled controls.
    // .getRawValue() returns an object containing the values of all controls, regardless of their disabled state.
    console.log('Form Value (Excludes Disabled):', this.enrollForm.value);
    console.log('Raw Form Value (Includes Disabled):', this.enrollForm.getRawValue());
    
    if (this.enrollForm.valid) {
      this.submitted = true;
    }
  }
}
