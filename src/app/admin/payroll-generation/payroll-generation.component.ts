import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PayrollService } from 'src/app/service/payroll.service';
@Component({
  selector: 'app-payroll-generation',
  templateUrl: './payroll-generation.component.html',
  styleUrls: ['./payroll-generation.component.css']
})
export class PayrollGenerationComponent implements OnInit {

  payrollForm!: FormGroup;

  constructor(private fb: FormBuilder, private PayrollService: PayrollService) {}

  ngOnInit(): void {
    this.payrollForm = this.fb.group({
      employeeName: [''],
      employeeID: [''],
      payPeriod: [''],
      workedHours: [0],
      payDate: [''],
      basicPay: [0],
      hra: [0],
      incomeTax: [0],
      providentFund: [0]
    });
  }

  onSubmit() {
    const formValue = this.payrollForm.value;
    console.log('Form Data:', formValue);
    const grossEarnings = formValue.basicPay + formValue.hra;
  const totalDeductions = formValue.incomeTax + formValue.providentFund;
  let netPayable = grossEarnings - totalDeductions;

  // Additional deduction based on worked hours
  const workedHours = formValue.workedHours;
  if (workedHours >= 100 && workedHours <= 128) {
    // No additional deduction
  } else if (workedHours >= 50 && workedHours < 100) {
    netPayable *= 0.5; // 50% deduction
  } else if (workedHours >= 25 && workedHours < 50) {
    netPayable *= 0.25; // 75% deduction
  } else if (workedHours < 25) {
    netPayable = 0; // Loss pay
  }
  console.log('Gross Earnings:', grossEarnings);
  console.log('Total Deductions:', totalDeductions);
  console.log('Net Payable After Additional Deduction:', netPayable);

    // Save the form data to the database
    this.PayrollService.addPayrollDetails({...formValue,netPayable}).subscribe(
      response => {
        console.log('Data saved successfully:', response);
        // Reset the form after saving
        this.payrollForm.reset();
      },
      error => {
        console.error('Error saving data:', error);
      }
    );
  }

  resetPayslip() {
    this.payrollForm.reset();
  }}