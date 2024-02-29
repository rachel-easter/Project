import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from '../admin-routing.module';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeeDetailsDialogComponent } from './employee-details-dialog/employee-details-dialog.component';

import { MatIconModule } from '@angular/material/icon';
import { AttendanceManagementComponent } from './attendance-management/attendance-management.component';
import { AttendanceDashboardComponent } from './attendance-dashboard/attendance-dashboard.component';
import { PayrollGenerationComponent } from './payroll-generation/payroll-generation.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    EnrollmentComponent,
    EmployeedetailsComponent,
    EmployeeDetailsDialogComponent,
    AttendanceManagementComponent,
    AttendanceDashboardComponent,
    PayrollGenerationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    FormsModule
  ],
  exports:[
    MatDialogModule
  ]
})
export class AdminModule { }
