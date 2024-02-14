import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AttendanceDashboardComponent } from './attendance-dashboard/attendance-dashboard.component';
import{PayrollViewComponent } from './payroll-view/payroll-view.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnrollmentComponent } from './admin/enrollment/enrollment.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'attendance', component: AttendanceDashboardComponent },
  { path:'payroll',component:PayrollViewComponent},
  {path:'login',component:LoginComponent},
  { path: 'admin', component:EnrollmentComponent },
  { path: 'user', component:HomeComponent },
  // Redirect to home for any other route
 // { path: '', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
