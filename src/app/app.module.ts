import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

import { AttendanceDashboardComponent } from './attendance-dashboard/attendance-dashboard.component';
import { PayrollViewComponent } from './payroll-view/payroll-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,    
    AttendanceDashboardComponent,
    PayrollViewComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    HttpClientModule,
    ReactiveFormsModule,  
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
