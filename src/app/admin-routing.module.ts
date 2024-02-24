import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from 'src/app/admin/admin-dashboard/admin-dashboard.component';
import { EnrollmentComponent } from './admin/enrollment/enrollment.component';
import{ EmployeedetailsComponent}from'src/app/admin/employeedetails/employeedetails.component';
const routes: Routes = [
 // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'admin', component: EnrollmentComponent },
  { path:'userdetails',component: EmployeedetailsComponent},
  // Add more routes as needed for other admin components
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
