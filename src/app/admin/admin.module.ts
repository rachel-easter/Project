import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from '../admin-routing.module';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';

import { MatDialogModule } from '@angular/material/dialog';
import { EmployeeDetailsDialogComponent } from './employee-details-dialog/employee-details-dialog.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    EnrollmentComponent,
    EmployeedetailsComponent,
    EmployeeDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class AdminModule { }
