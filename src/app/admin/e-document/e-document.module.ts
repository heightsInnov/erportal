import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EDocumentComponent } from './e-document.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MaterialModule } from 'src/app/core/shared/material.module';
import { ViewEdocumentComponent } from './view-edocument/view-edocument.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

const route: Routes = [
  {
    path: '',
    component: EDocumentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view-edocument',
    component: ViewEdocumentComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [EDocumentComponent, ViewEdocumentComponent],
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
