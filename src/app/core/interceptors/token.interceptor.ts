import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request);
    const clonedRequest = request.clone({
                                          headers: this.auth.getTokenHeader(request),
                                          url: this.fixUrl(request.url)
                                        });
    console.log(clonedRequest);
    return next.handle(clonedRequest);
  }

  private fixUrl(url: string) {
    console.log(url);
    if (url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0) {
      return url;
    } else {
      return environment.apiBaseUrl + url;
    }
  }

}
