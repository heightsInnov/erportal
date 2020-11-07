import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpRequest, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILoginPayload, IResetPayload } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
    ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError (error.error);
    } else {
      return throwError (error);
    }
  }

  getAuthorizationToken(): Observable<any> {
    const url = this.baseUrl + 'login';
    const payload: ILoginPayload = {username: 'web', password: 'weberp@123'};
    return this.http.post<any>(url, payload, { observe: 'response'} ).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  login(payload: ILoginPayload): Observable<any> {
    const url = this.baseUrl + environment.loginUrl;
    return this.http.post<any>(url, payload).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  resetPassword(payload: IResetPayload): Observable<any> {
    const url = this.baseUrl + environment.resetPasswordUrl;
    return this.http.post<any>(url, payload).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    // Removing token after logout
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwt');
      // localStorage.removeItem('user');
      // redirect to login
      this.router.navigate(['/auth/login']);
    }
  }


  getTokenHeader(request: HttpRequest<any>): HttpHeaders {
    const token =
    (localStorage.getItem('jwt') !== null || localStorage.getItem('jwt') !== undefined) ? localStorage.getItem('jwt') : '';
    return token === '' ? new HttpHeaders({
      'Content-Type': request.headers.get('Content-Type') || 'application/json'
    }) : new HttpHeaders({
      'Content-Type': request.headers.get('Content-Type') || 'application/json',
      Authorization: token
    });
  }

  setTokenInLocalStorage(token: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('jwt', token);
    }
  }

}
