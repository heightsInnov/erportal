import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateDocumentComponent } from './create-document/create-document.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentComponent
  },
  {
    path: 'create-document',
    component: CreateDocumentComponent
  }
];

@NgModule({
  declarations: [DocumentComponent, CreateDocumentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DocumentModule { }
