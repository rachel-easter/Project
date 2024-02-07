import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AttendanceDashboardComponent } from './attendance-dashboard/attendance-dashboard.component';
import{PayrollViewComponent } from './payroll-view/payroll-view.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'attendance', component: AttendanceDashboardComponent },
  { path:'payroll',component:PayrollViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
