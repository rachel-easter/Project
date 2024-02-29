import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payroll-generation',
  templateUrl: './payroll-generation.component.html',
  styleUrls: ['./payroll-generation.component.css']
})
export class PayrollGenerationComponent implements OnInit {

  payrollForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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

  onSumbit() {
    const formValue = this.payrollForm.value;
    console.log('Employee Name:', formValue.employeeName);
    console.log('Employee ID:', formValue.employeeID);
    console.log('Pay Period:', formValue.payPeriod);
    console.log('Worked Hours:', formValue.workedHours);
    console.log('Pay Date:', formValue.payDate);
    console.log('Basic Pay:', formValue.basicPay);
    console.log('HRA:', formValue.hra);
    console.log('Income Tax:', formValue.incomeTax);
    console.log('Provident Fund:', formValue.providentFund);

    // Perform calculations here using the form values
    // For example:
    const grossEarnings = formValue.basicPay + formValue.hra;
    const totalDeductions = formValue.incomeTax + formValue.providentFund;
    const netPayable = grossEarnings - totalDeductions;
    
    console.log('Gross Earnings:', grossEarnings);
    console.log('Total Deductions:', totalDeductions);
    console.log('Net Payable:', netPayable);
  }

  resetPayslip() {
    this.payrollForm.reset();
  }
}
