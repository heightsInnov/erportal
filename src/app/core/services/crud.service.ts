import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
    ) { }

  createData(endpoint, data): Observable<any> {
    const url = this.baseUrl + endpoint;
    this.spinner.show();
    return this.http.post<any>(url, data).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError),
      finalize(() => this.spinner.hide())
    )
  }

  getData(endpoint): Observable<any> {
    const url = this.baseUrl + endpoint;
    this.spinner.show();
    return this.http.get<any>(url).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError),
      finalize(() => this.spinner.hide())
    );
  }

  updateData(endpoint, data): Observable<any> {
    const url = this.baseUrl + endpoint;
    this.spinner.show();
    return this.http.put<any>(url, data).pipe(
      map(response => {
        this.spinner.hide();
        return response;
      }),
      catchError(this.handleError),
      finalize(() => this.spinner.hide())
    );
  }

  deleteData(endpoint, data): Observable<any> {
    const url = this.baseUrl + endpoint;
    this.spinner.show();
    return this.http.delete<any>(url, data).pipe(
      map(response => {
        this.spinner.hide();
        return response;
      }),
      catchError(this.handleError),
      finalize(() => this.spinner.hide())
    );
  }

  uploadData(endpoint, data): Observable<any> {
    const url = this.baseUrl + endpoint;
    this.spinner.show();
    return this.http.post<any>(url, data).pipe(
      map(response => {
        this.spinner.hide();
        // console.log(response);
        // this.getEventMessage(response, fileData);
        return response;
      }),
      catchError(this.handleError),
      finalize(() => this.spinner.hide())
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError (error.error);
    } else {
      return throwError (error);
    }
  }

  // private getEventMessage(event: HttpEvent<any>, file: File) {
  //   switch (event.type) {
  //     case HttpEventType.Sent:
  //       return `Uploading file "${file.name}" of size ${file.size}.`;

  //     case HttpEventType.UploadProgress:
  //       // Compute and show the % done:
  //       const percentDone = Math.round(100 * event.loaded / event.total);
  //       return `File "${file.name}" is ${percentDone}% uploaded.`;

  //     case HttpEventType.Response:
  //       return `File "${file.name}" was completely uploaded!`;

  //     default:
  //       return `File "${file.name}" surprising upload event: ${event.type}.`;
  //   }
  // }

}
