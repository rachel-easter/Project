import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payroll-view',
  templateUrl: './payroll-view.component.html',
  styleUrls: ['./payroll-view.component.css']
})
export class PayrollViewComponent implements OnInit {
  payrollForm!: FormGroup;
  payslipData: any;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.payrollForm = this.fb.group({
      employeeId: ['', Validators.required],
      month: ['', Validators.required]
    });
  }

  generatePayslip() {
    if (this.payrollForm.valid) {
      const employeeId = this.payrollForm.value.employeeId;
      const month = this.payrollForm.value.month;

     
      this.http.get<any>(`/api/payslip/${employeeId}/${month}`).subscribe(
        payslip => {
          this.payslipData = payslip;
        },
        error => {
          console.error('Error fetching payslip data:', error);
          
        }
      );
    }
  }
}
