import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  private baseURL = 'http://127.0.0.1:5984';
  private credentials = 'admin:admin';

  constructor(private http: HttpClient) { }

  addEmployeeToDocument(employee: any): Observable<any> {
    const documentId = 'beb3c6c53b036dc9aade6597bf0103ad';
    const url = `${this.baseURL}/registeration/${documentId}`;

    return this.http.get<any>(url, { headers: this.getHeaders() }).pipe(
      switchMap((document: any) => {
        if (!document._id) {
          document._id = documentId;
        }
        if (!document.employees) {
          document.employees = [];
        }

        const idExists = document.employees.some((emp: any) => emp.id === employee.id);
        if (idExists) {
          // If ID already exists, return an observable immediately with an error message
          alert('Employee ID already exists.');
          return of(null); // Return an observable immediately
        } else {
          // If ID does not exist, add the employee and return the HTTP request observable
          document.employees.push(employee);
          return this.http.put<any>(url, document, { headers: this.getHeaders() });
        }
      })
    );
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.credentials)
    });
  } 
}
