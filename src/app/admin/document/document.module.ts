import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DocumentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-leave',
    component: CreateDocumentComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [DocumentComponent, CreateDocumentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class DocumentModule { }
