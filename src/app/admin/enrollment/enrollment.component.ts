import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginserviceService } from 'src/app/service/loginservice.service';
@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

  employeeForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginserviceService: LoginserviceService
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      id: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      return;
    }

    const employeeData = this.employeeForm.value;

    this.loginserviceService.addEmployeeToDocument(employeeData).subscribe(
      response => {
        console.log('Employee added to document:', response);
        // Reset form
        this.employeeForm.reset();
      },
      error => {
        console.error('Error adding employee to document:', error);
      }
    );
  }
}

