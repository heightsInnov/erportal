import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error Occured: ', error.error);
    } else {
      console.log(`Backend returned: `, error);
    }
    return throwError ('Something Bad Just happened right now');
  }

  createData(endpoint, data): Observable<any> {
    const url = this.baseUrl + endpoint;
    return this.http.post<any>(url, data).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getData(endpoint): Observable<any> {
    const url = this.baseUrl + endpoint;
    return this.http.get<any>(url).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  updateData(endpoint, data): Observable<any> {
    const url = this.baseUrl + endpoint;
    return this.http.put<any>(url, data).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  deleteData(endpoint, data): Observable<any> {
    const url = this.baseUrl + endpoint;
    return this.http.delete<any>(url, data).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

}
