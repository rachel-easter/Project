import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private baseURL = 'http://127.0.0.1:5984';
  private credentials = 'admin:admin';

  constructor(private http: HttpClient) { }

  addEmployee(employee: any): Observable<any> {
    const documentId = 'f4732e216ca2ff20af70060068003cbb';
    const url = `${this.baseURL}/employeedetails/${documentId}`;

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
          alert('Employee ID already exists.');
          return of(null);
        } else {
          document.employees.push(employee);
          return this.http.put<any>(url, document, { headers: this.getHeaders() });
        }
      })
    );
  }

  deleteEmployee(employeeId: string): Observable<any> {
    const documentId = 'f4732e216ca2ff20af70060068003cbb';
    const url = `${this.baseURL}/employeedetails/${documentId}`;

    return this.http.get<any>(url, { headers: this.getHeaders() }).pipe(
      switchMap((document: any) => {
        if (!document._id) {
          document._id = documentId;
        }
        if (!document.employees) {
          return of(null);
        }

        document.employees = document.employees.filter((emp: any) => emp.id !== employeeId);
        return this.http.put<any>(url, document, { headers: this.getHeaders() });
      })
    );
  }

  updateEmployee(employee: any): Observable<any> {
    const documentId = 'f4732e216ca2ff20af70060068003cbb';
    const url = `${this.baseURL}/employeedetails/${documentId}`;

    return this.http.get<any>(url, { headers: this.getHeaders() }).pipe(
      switchMap((document: any) => {
        if (!document._id) {
          document._id = documentId;
        }
        if (!document.employees) {
          return of(null);
        }

        const index = document.employees.findIndex((emp: any) => emp.id === employee.id);
        if (index === -1) {
          return of(null);
        }

        document.employees[index] = employee;
        return this.http.put<any>(url, document, { headers: this.getHeaders() });
      })
    );
  }

  getEmployees(): Observable<any[]> {
    const documentId = 'f4732e216ca2ff20af70060068003cbb';
    const url = `${this.baseURL}/employeedetails/${documentId}`;

    return this.http.get<any>(url, { headers: this.getHeaders() }).pipe(
      map((document: any) => {
        if (!document._id) {
          return [];
        }
        if (!document || !document._id ||!document.employees) {
          return [];
        }
        return document.employees;
      })
    );
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.credentials)
    });
  }
  getFilteredEmployees(attendanceStartRange: string, attendanceEndRange: string): Observable<any[]> {
    const url = `${this.baseURL}/employeedetails/f4732e216ca2ff20af70060068003cbb`;
    return this.http.get<any>(url, { headers: this.getHeaders() }).pipe(
      map(response => {
        if (response && response.employees) {
          return response.employees.filter((employee: any) => {
            const attendanceLevel = parseInt(employee.AttendanceLevel);
            return attendanceLevel >= parseInt(attendanceStartRange) && attendanceLevel <= parseInt(attendanceEndRange);
          });
        } else {
          return [];
        }
      })
    );
  }  
}
