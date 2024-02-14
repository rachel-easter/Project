import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators'; // Import switchMap operator

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  private baseURL = 'http://127.0.0.1:5984'; // Update with your CouchDB base URL
  private credentials = 'admin:admin'; // Update with your CouchDB credentials

  constructor(private http: HttpClient) { }

  addEmployeeToDocument(employee: any): Observable<any> {
    const documentId = 'beb3c6c53b036dc9aade6597bf0103ad'; // Replace with the actual document ID
    const url = `${this.baseURL}/registeration/${documentId}`; // Replace your_database_name with your actual database name

    return this.http.get<any>(url, { headers: this.getHeaders() }).pipe(
      switchMap((document: any) => {
        if (!document._id) {
          
          document._id = documentId;
        }
        if (!document.employees) {
          document.employees = [];
        }
        document.employees.push(employee);
        return this.http.put<any>(url, document, { headers: this.getHeaders() });
      })
    );
  }

  // Method to get HTTP headers with basic authentication
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.credentials)
    });
  }
}
