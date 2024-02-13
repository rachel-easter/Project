import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { CouchDBService } from '../couchdb.service';
import{RxwebValidators, json} from '@rxweb/reactive-form-validators';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-payroll-view',
  templateUrl: './payroll-view.component.html',
  styleUrls: ['./payroll-view.component.css']
})
export class PayrollViewComponent {
  payrollForm: FormGroup;
  employeeDocument: any=null;
 generateButtonEnabled!: boolean;
  data: any;
  
  

  constructor(private fb: FormBuilder, private couchDBService: CouchDBService) {
    this.payrollForm = this.fb.group({
      employeeName: ['',[Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], 
      employeeId: [''],
      month: ['', Validators.required]
    });

    
  }
  generatePayslip() {
    const employeeName = this.payrollForm.get('employeeName')?.value;
    if (this.payrollForm.invalid) {
      alert('Please fill out all fields before generating the payslip.');
      return;
    }
  
   
    if (this.payrollForm.get('employeeId')?.invalid) {
      alert('Employee ID is invalid. Please enter a valid numeric ID.');
      return;
    }
    this.couchDBService.getEmployeeByName(employeeName).subscribe(
      (data: any) => {
        console.log('Response from CouchDB:', data); 
        if (data && data.docs && data.docs.length > 0) {
          // Employee document found, assign it to a variable
          this.employeeDocument = data.docs[0];
          console.log(data.docs);
        } else {
          console.log('Employee not found.');
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  downloadTableData():void{
    
    const content = `
    Employee Name: ${this.employeeDocument?.employeeName}
    Employee ID: ${this.employeeDocument?.employeeId}
    Aadhar: ${this.employeeDocument?.aadhar}
    PAN: ${this.employeeDocument?.pan}
    Join Date: ${this.employeeDocument?.joinDate}
    Designation: ${this.employeeDocument?.designation}
    Basic Pay: ${this.employeeDocument?.basicPay}
    Salary Days: ${this.employeeDocument?.salaryDays}
    Total Days: ${this.employeeDocument?.TotalDays}
    LOP: ${this.employeeDocument?.lop}
    Deduction: ${this.employeeDocument?.deduction}
    Net: ${this.employeeDocument?.Net}
    Net Words: ${this.employeeDocument?.NetWords}
`;

const blob = new Blob([content], { type: 'application/msword' });
saveAs(blob, 'employee_data.doc');    
  }
}  