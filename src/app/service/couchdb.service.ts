import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouchDBService {
  
  private baseURL = 'http://127.0.0.1:5984';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin') 
    })
  };

  constructor(private http: HttpClient) { }

  getEmployeeByName(employeeName: string): Observable<any> {
    const selector = {
      selector: {
        employeeName: employeeName
      }
    };
    return this.http.post<any>(`${this.baseURL}/employee/_find`, selector, this.httpOptions);
  }
}
