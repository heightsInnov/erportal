import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MaterialModule } from 'src/app/core/shared/material.module';

const routes: Routes = [
  {
    path: '',
    component: DocumentComponent,
    data: { breadcrumb: 'Leave' },
    canActivate: [AuthGuard]
  },
  {
    path: 'create-leave',
    component: CreateDocumentComponent,
    data: { breadcrumb: 'Create Leave' },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [DocumentComponent, CreateDocumentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class DocumentModule { }
