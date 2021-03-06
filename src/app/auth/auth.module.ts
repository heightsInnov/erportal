import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SessionGuard } from '../core/guards/session.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [SessionGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [LoginComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
