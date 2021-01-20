import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpRequest, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILoginPayload, IResetPayload, IUserProfile } from '../models/IUser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiBaseUrl;
  private loggedIn = new BehaviorSubject('false');
  checkLogin = this.loggedIn.asObservable();
  private userDetails: IUserProfile = JSON.parse(localStorage.getItem('user'));

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: any
    ) { }

  private handleError(error: HttpErrorResponse) {
    // this.spinner.hide();
    if (error.error instanceof ErrorEvent) {
      return throwError (error.error);
    } else {
      return throwError (error);
    }
  }

  getAuthorizationToken(): Observable<any> {
    const url = this.baseUrl + 'login';
    const payload: ILoginPayload = {username: 'web', password: 'weberp@123'};
    console.log('auth');
    return this.http.post<any>(url, payload, { observe: 'response'}).pipe(
      map(response => {
        if (response.status === 200 && response.headers.has('authorization')) {
          const token = response.headers.get('authorization');
          this.setTokenInLocalStorage(token);
        }
        return response.body;
      }),
      catchError(this.handleError)
    );
  }

  login(payload: ILoginPayload): Observable<any> {
    const url = this.baseUrl + environment.loginUrl;
    this.spinner.show();
    return this.http.post<any>(url, payload).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  changeLoginState(message: string) {
    this.loggedIn.next(message);
  }

  resetPassword(payload: IResetPayload): Observable<any> {
    const url = this.baseUrl + environment.resetPasswordUrl;
    this.spinner.show();
    return this.http.post<any>(url, payload).pipe(
      map(response => {
        this.spinner.hide();
        return response;
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    // Removing token after logout
    if (isPlatformBrowser(this.platformId)) {
      this.spinner.show();
      this.toastr.info(
        'You Have Been Logged Out Successfully', `Goodbye ${this.userDetails.emp_firstname} ${this.userDetails.emp_lastname}`
      );
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      this.changeLoginState('false');
      // redirect to login
      this.spinner.hide();
      this.router.navigate(['/auth/login']);
    }
  }


  // getTokenHeader(request: HttpRequest<any>): HttpHeaders {
  //   const token =
  //   (localStorage.getItem('jwt') !== null || localStorage.getItem('jwt') !== undefined) ? localStorage.getItem('jwt') : '';
  //   return token === '' ? new HttpHeaders({
  //     'Content-Type': request.headers.get('Content-Type') || 'application/json'
  //   }) : new HttpHeaders({
  //     'Content-Type': request.headers.get('Content-Type') || 'application/json',
  //     Authorization: token
  //   });
  // }

  getTokenHeader(request: HttpRequest<any>): HttpHeaders {
    const token = localStorage.getItem('jwt') !== null ? localStorage.getItem('jwt') : '';
    console.log(localStorage.getItem('jwt'));
    console.log(token);
    if (token !== '') {
      return new HttpHeaders({Authorization: token});
    } else {
      return new HttpHeaders({'Content-Type': 'application/json'});
    }
  }

  setTokenInLocalStorage(token: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('jwt', token);
    }
  }

}
