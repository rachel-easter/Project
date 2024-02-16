import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthenticationService } from 'src/app/service/user-authentication.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoginSuccess: boolean = false;
  isFormSubmitted: boolean = false;
  nameContainsNumber: boolean=false;

  constructor(private fb: FormBuilder, private authService: UserAuthenticationService,
    private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required]
    });
  }

  onNameInput(event: any): void {
    const inputText = event.target.value;
    this.nameContainsNumber = /\d/.test(inputText);
  }


   myFunction() {
    const x: HTMLInputElement | null = document.getElementById("password") as HTMLInputElement;
    if (x?.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.loginForm.valid) {
      const { name,id } = this.loginForm.value;
      const value=id.toString();
      const key = CryptoJS.enc.Utf8.parse('secret key');
     const iv = CryptoJS.enc.Utf8.parse('1234567890123456');    
     const encrypted = CryptoJS.AES.encrypt(value,key,{iv:iv}).toString();
  
     console.log(encrypted);
      this.authService.login(name, encrypted).subscribe(
        (isValidUser: boolean) => {
          this.isLoginSuccess = isValidUser;
          if (isValidUser) {
            console.log('Login successful');
            localStorage.setItem('isLoggedIn', 'true');
            console.log('isLoggedIn status in local storage:', localStorage.getItem('isLoggedIn'));
            this.router.navigate(['/user']);     
                 
          } else {
            alert('Please make a Registration!');            
          }
        },
        (error: any) => {
          console.error('Login failed:', error);
          
        }
      );
    }
  }
}
