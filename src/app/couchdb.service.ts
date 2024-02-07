import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CouchdbService {
  generatePayslip(employeeId: number, month: DataView) {
    throw new Error('Method not implemented.');
  }
  
  private baseURL = 'http://localhost:5984'; // CouchDB URL
  private baseUrl = 'http://localhost:5984/employee';  

  constructor(private http: HttpClient) { }

  getPayslip(employeeId: number, month: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/employee/${employeeId}/${month}`);
  }
  
}
