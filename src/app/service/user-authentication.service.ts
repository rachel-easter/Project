import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticationService {
  private apiUrl = 'http://127.0.0.1:5984/registeration/beb3c6c53b036dc9aade6597bf0103ad'; // Replace with your CouchDB endpoint

  private headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa('admin:admin'),
    'Content-Type': 'application/json',
    // Add any other headers you need for authentication
  });

  constructor(private http: HttpClient) {}

  login(name: string, id: number): Observable<boolean> {
    return this.http.get<any>(this.apiUrl, { headers: this.headers }).pipe(
      map((document: any) => {
        const employees = document.employees || [];

        // Check if the provided username and password match any user in the employees array
        const isValidUser = employees.some((employee: any) => employee.name === name && employee.id=== id);

        return isValidUser;
      }),
      catchError((error) => {
        console.error('Error during login:', error);
        return of(false);
      })
    );
  }
}
