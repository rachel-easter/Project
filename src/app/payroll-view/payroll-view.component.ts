import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PayrollService } from 'src/app/service/payroll.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-payroll-view',
  templateUrl: './payroll-view.component.html',
  styleUrls: ['./payroll-view.component.css']
})
export class PayrollViewComponent {
  @ViewChild('content') content!: ElementRef;
  payrollForm: FormGroup;
  employeeDocument: any = null;
  nameContainsNumber: boolean = false;
  isButtonDisabled: boolean = true;

  constructor(private fb: FormBuilder, private PayrollService: PayrollService) {
    this.payrollForm = this.fb.group({
      employeeName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      employeeID: [''],
      month: ['', Validators.required]
    });
  }

  generatePayslip() {
    console.log('Generating payslip...');
    const employeeName = this.payrollForm.get('employeeName')?.value;
    console.log('Employee Name:', employeeName);
    const employeeID = this.payrollForm.get('employeeID')?.value;
    if (this.payrollForm.invalid) {
      alert('Please fill out all fields before generating the payslip.');
      return;
    }

    this.PayrollService.getEmployeeByName(employeeName,employeeID).subscribe(
      (data: any) => {
        console.log('Response from CouchDB:', data);
        if (data && data.length > 0) {
          this.employeeDocument = data[0];
          console.log(data.docs);
          this.isButtonDisabled = false;
        } else {
          alert('Employee not found.');
          this.employeeDocument = null;
        this.isButtonDisabled = true;
        }
        
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  downloadTableData(): void {
    if (!this.employeeDocument) {
      alert('No employee data available.');
      return;
    }

    const content = `
      Employee Name: ${this.employeeDocument.employeeName}
      Employee ID: ${this.employeeDocument.employeeId}
      Aadhar: ${this.employeeDocument.aadhar}
      PAN: ${this.employeeDocument.pan}
      Join Date: ${this.employeeDocument.joinDate}
      Designation: ${this.employeeDocument.designation}
      Basic Pay: ${this.employeeDocument.basicPay}
      Salary Days: ${this.employeeDocument.salaryDays}
      Total Days: ${this.employeeDocument.TotalDays}
      LOP: ${this.employeeDocument.lop}
      Deduction: ${this.employeeDocument.deduction}
      Net: ${this.employeeDocument.Net}
      Net Words: ${this.employeeDocument.NetWords}
    `;

    const doc = new jsPDF();
    doc.text(content, 10, 10);
    doc.save('employee_data.pdf');
  }


  onNameInput(event: any): void {
    const inputText = event.target.value;
    this.nameContainsNumber = /\d/.test(inputText);
  }
  checkAllFieldsFilled() {
    // Check if all fields in the form are filled
    const { employeeName, employeeID, month } = this.payrollForm.value;
    return employeeName && employeeID && month;
  }
}
//need to wite logic for month and year
