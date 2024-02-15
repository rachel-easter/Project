import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthenticationService } from 'src/app/service/user-authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoginSuccess: boolean = false;
  isFormSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private authService: UserAuthenticationService,
    private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.loginForm.valid) {
      const { name,id } = this.loginForm.value;
      this.authService.login(name, id).subscribe(
        (isValidUser: boolean) => {
          this.isLoginSuccess = isValidUser;
          if (isValidUser) {
            console.log('Login successful');
            localStorage.setItem('isLoggedIn', 'true');
            console.log('isLoggedIn status in local storage:', localStorage.getItem('isLoggedIn'));
            this.router.navigate(['/user']);     
                 
          } else {
            console.error('Invalid username or password');            
          }
        },
        (error: any) => {
          console.error('Login failed:', error);
          
        }
      );
    }
  }
}
