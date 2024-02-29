import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from 'src/app/admin/admin-dashboard/admin-dashboard.component';
import { EnrollmentComponent } from './admin/enrollment/enrollment.component';
import{ EmployeedetailsComponent}from'src/app/admin/employeedetails/employeedetails.component';
import { AttendanceManagementComponent } from 'src/app/admin/attendance-management/attendance-management.component';
import{PayrollGenerationComponent} from 'src/app/admin/payroll-generation/payroll-generation.component';
const routes: Routes = [
 // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'admin', component: EnrollmentComponent },
  { path:'userdetails',component: EmployeedetailsComponent},
  {path:'adminattendance',component:AttendanceManagementComponent},
  {path:'adminpayroll',component:PayrollGenerationComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class AdminRoutingModule { }
