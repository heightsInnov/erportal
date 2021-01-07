import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeComponent } from './employee.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MaterialModule } from 'src/app/core/shared/material.module';


const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-employee',
    component: CreateEmployeeComponent,
    data: { breadcrumb: 'Create Employee' },
    canActivate: [AuthGuard]
  },
  {
    path: 'view-employee',
    component: ViewEmployeeComponent,
    data: { breadcrumb: 'View Employee' },
    canActivate: [AuthGuard]
  }
];
@NgModule({
  declarations: [EmployeeComponent, CreateEmployeeComponent, ViewEmployeeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class EmployeeModule { }
