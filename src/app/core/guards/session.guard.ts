import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUserProfile } from '../models/IUser';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('jwt');
    const userProfile: IUserProfile = JSON.parse(localStorage.getItem('user'));
    if (token !== null && this.instanceOfUserProfile(userProfile)) {
      this.router.navigate(['/admin']);
      return false;
    }
    return true;
  }

  instanceOfUserProfile(obj: IUserProfile) {
    return obj ? true : false;
  }
}
