import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EDocumentComponent } from './e-document.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MaterialModule } from 'src/app/core/shared/material.module';
import { ViewEdocumentComponent } from './view-edocument/view-edocument.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HrDocumentComponent } from './hr-document/hr-document.component';

const route: Routes = [
  {
    path: 'e-documents',
    component: EDocumentComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'E-Documents' },
  },
  {
    path: 'view-edocument',
    component: ViewEdocumentComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'View Documents' },
  },
  {
    path: 'hr-documents',
    component: HrDocumentComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'HR-Documents' },
  },
];

@NgModule({
  declarations: [EDocumentComponent, ViewEdocumentComponent, HrDocumentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgSelectModule
  ]
})
export class EDocumentModule { }
