import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailsService } from 'src/app/service/details.service';
import { MatDialog } from '@angular/material/dialog';

import { EmployeeDetailsDialogComponent } from 'src/app/admin/employee-details-dialog/employee-details-dialog.component';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeedetailsComponent implements OnInit {
  employeeForm!: FormGroup;
  employees: any[] = [];
  isEditing = false;
  selectedEmployee: any; 
  showForm: boolean=false;
  selectedEmployeeDetails: any;

  constructor(private fb: FormBuilder, private detailsService: DetailsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.createForm();
    this.getEmployees();
  }

  createForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      address: [''],
      education: [''],
      phoneNumber: ['', Validators.required],
      type: ['', Validators.required],
      gender: ['', Validators.required],
      aadharNumber: ['', Validators.required],
      dob: ['', Validators.required],
      nationality: [''],
      maritalStatus: [''],
      email: ['', Validators.email],
      jobTitle: [''],
      startDate: ['', Validators.required],
      employmentStatus: [false]
    });
  }

  getEmployees(): void {
    this.detailsService.getEmployees().subscribe(
      employees => {
        this.employees = employees;
      },
      error => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  addEmployee(): void {
    if (this.employeeForm.valid) {
      const employee = this.employeeForm.value;
      this.detailsService.addEmployee(employee).subscribe(
        () => {
          this.getEmployees(); // Refresh the list after adding
          this.employeeForm.reset();
        },
        error => {
          console.error('Error adding employee:', error);
        }
      );
    }
  }

  updateEmployee(): void {
    if (this.employeeForm.valid) {
      const employee = this.employeeForm.value;
      this.detailsService.updateEmployee(employee).subscribe(
        () => {
          this.getEmployees(); // Refresh the list after updating
          this.employeeForm.reset();
          this.isEditing = false;
        },
        error => {
          console.error('Error updating employee:', error);
        }
      );
    }
  }

  deleteEmployee(id: string): void {
    this.detailsService.deleteEmployee(id).subscribe(
      () => {
        this.employees = this.employees.filter(emp => emp.id !== id);
      },
      error => {
        console.error('Error deleting employee:', error);
      }
    );
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.employeeForm.reset();
      this.isEditing = false;
    }
  }
  editEmployee(employee: any): void {
    this.selectedEmployee = employee;
    this.employeeForm.patchValue(employee);
    this.isEditing = true;
    this.showForm = true; // Show the form
  }

  cancelForm(): void {
    this.employeeForm.reset();
    this.isEditing = false;
    this.showForm = false;
  }

  // viewEmployeeDetails(employee: any): void {
  //   const dialogRef = this.dialog.open(EmployeeDetailsDialogComponent, {
  //       width: '400px', // Set your desired width
  //       data: employee // Pass the selected employee data to the dialog
  //   });

  viewEmployeeDetails(employee: any): void {
    this.selectedEmployeeDetails = employee;
    console.log("Employee Details:", this.selectedEmployeeDetails);
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EmployeeDetailsDialogComponent, {
      width: '400px', 
      data: this.selectedEmployeeDetails
    });

    dialogRef.afterClosed().subscribe((_result: any) => {
      console.log('The dialog was closed');
    });
  }
}
