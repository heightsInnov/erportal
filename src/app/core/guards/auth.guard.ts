import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IUserProfile } from '../models/IUser';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
// export class AuthGuard implements CanActivate, CanLoad {
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
    const token = localStorage.getItem('jwt');
    const userProfile: IUserProfile = JSON.parse(localStorage.getItem('user'));
    if (token && this.instanceOfUserProfile(userProfile)) {
      return true;
    } else {
      this.toastr.error('User not authenticated', 'Please Login');
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

  // canLoad(route: Route): boolean {
  //   const url: string = route.path;
  //   console.log(`Url = ${url}`);
  //   if (url === 'admin') {
  //     this.toastr.warning('You are not authorised to visit this page');
  //     return false;
  //   }
  //   return true;
  // }

  instanceOfUserProfile(obj: IUserProfile) {
    return obj ? true : false;
  }


}
