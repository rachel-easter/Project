// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserAuthenticationService } from 'src/app/service/user-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: UserAuthenticationService, private router: Router) {}

 canActivate(): boolean {
  const isLoggedIn = this.authService.isLoggedIn();
  console.log('Is user logged in?', isLoggedIn);
  if (isLoggedIn) {
    return true;
  } else {
    console.log('User is not logged in. Redirecting to login page.');
    this.router.navigate(['/login']);
    return false;
  }
}

}
