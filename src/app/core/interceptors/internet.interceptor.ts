import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { fromEvent, merge, Observable, Observer, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class InternetInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // check to see if there's internet
    // this.createOnline$().subscribe(isOnline => console.log(isOnline));
    if (!window.navigator.onLine) {
      // if there's no internet, throw an httperror
      return throwError (new HttpErrorResponse({
                                                error: {error: 'INTERNET DISCONNECTED'},
                                                status: 999,
                                                statusText: 'INTERNET_DISCONNECTED'
                                              }));
    } else {
      return next.handle(request);
    }
  }

  createOnline$() {
    return merge<boolean> (
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }
}
