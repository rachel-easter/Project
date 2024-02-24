import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import * as CryptoJS from 'crypto-js'; 

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {  
  employeeForm!: FormGroup;
  nameContainsNumber: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private loginserviceService: LoginserviceService
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.pattern('[a-zA-Z]*')]],
      id: ['', [Validators.required, this.numericLengthValidator(1, 9)]]
    });
  }
  
  onNameInput(event: any): void {
    const inputText = event.target.value;
    this.nameContainsNumber = /\d/.test(inputText);
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      return;
    }
    

    const employeeData = this.employeeForm.value;
    const value=employeeData.id;
    const key = CryptoJS.enc.Utf8.parse('secret key');
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456');
  //  employeeData.id=CryptoJS.AES.encrypt(employeeData.id.toString(),'secret key').toString(); 
   
   const encrypted = CryptoJS.AES.encrypt(value,key,{iv:iv}).toString();
   console.log(encrypted);
   this.loginserviceService.addEmployeeToDocument({ ...employeeData, id: encrypted }).subscribe(
     response => {
    
        console.log('Employee added to document:', response);
        
        this.employeeForm.reset();
      },
      error => {
        console.error('Error adding employee to document:', error);
      }
    );
  }
  alphabetsOnlyValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (!/^[A-Za-z]+$/.test(value)) {
      return { 'alphabetsOnly': true };
    }
    return null;
  }

  numericLengthValidator(minLength: number, maxLength: number): any {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!/^\d+$/.test(value) || value.length < minLength || value.length > maxLength) {
        return { 'numericLength': true };
      }
      return null;
    };
  }

 








}

