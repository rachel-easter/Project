import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  private baseURL = 'http://127.0.0.1:5984'; // CouchDB URL
  private credentials = 'admin:admin'; // CouchDB credentials

  constructor(private http: HttpClient) { }

  addPayrollDetails(payrollData: any): Observable<any> {
    const documentId = 'cb4ff555dcd201de0cb6c0b3b2000231'; // Your document ID in CouchDB
    const url = `${this.baseURL}/payrolldetails/${documentId}`;
    return this.http.get<any>(url, { headers: this.getHeaders() }).pipe(
      switchMap((document: any) => {
        if (!document._id) {
          document._id = documentId;
        }
        if (!document.payrolls) {
          document.payrolls = [];
        }

        document.payrolls.push(payrollData);

        return this.http.put<any>(url, document, { headers: this.getHeaders() });
      })
    );
  }
  getEmployeeByName(employeeName: string,employeeID:string): Observable<any> {
    const documentId = 'cb4ff555dcd201de0cb6c0b3b2000231';
    const url=`${this.baseURL}/payrolldetails/${documentId}`;

    return this.http.get<any>(url, { headers: this.getHeaders() }).pipe(
      switchMap((document: any) => {
        if (!document || !document.payrolls || !Array.isArray(document.payrolls)) {
          // Handle the case where the document or payrolls array is missing or not an array
          console.error('Invalid document structure:', document);
          return of([]);
        }
  
        const filteredPayrolls = document.payrolls.filter((payroll: any) =>
          payroll.employeeName === employeeName && payroll.employeeID === employeeID
        );
        return of(filteredPayrolls);
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
