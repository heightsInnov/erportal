import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeComponent } from './employee.component';
import { Routes, RouterModule } from '@angular/router';
import { NbCardModule, NbTabsetModule, NbStepperModule, NbAccordionModule } from '@nebular/theme';


const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent
  },
  {
    path: 'create-employee',
    component: CreateEmployeeComponent
  },
  {
    path: 'view-employee',
    component: ViewEmployeeComponent
  }
];
@NgModule({
  declarations: [EmployeeComponent, CreateEmployeeComponent, ViewEmployeeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NbStepperModule,
    NbCardModule,
    NbAccordionModule,
    NbTabsetModule,
    // NbDialogModule.forChild()
  ]
})
export class EmployeeModule { }
