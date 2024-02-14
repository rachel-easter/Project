import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthenticationService } from 'src/app/service/user-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoginSuccess: boolean = false;
  isFormSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private authService: UserAuthenticationService) { }

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
            // Redirect or display a success message
          } else {
            console.error('Invalid username or password');
            // Display an error message to the user
          }
        },
        (error: any) => {
          console.error('Login failed:', error);
          // Display an error message to the user
        }
      );
    }
  }
}
