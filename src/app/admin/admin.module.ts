import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {
         NbActionsModule, NbCardModule, NbContextMenuModule,
         NbDialogModule, NbInputModule, NbLayoutModule,
         NbListModule, NbSidebarModule, NbThemeModule
        } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
      },
      {
        path: 'handover',
        loadChildren: () => import('./project/project.module').then(m => m.ProjectModule)
      },
      {
        path: 'documents',
        loadChildren: () => import('./document/document.module').then(m => m.DocumentModule)
      }
    ]
  },

];

@NgModule({
  declarations: [AdminComponent, DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    LayoutModule,
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbInputModule,
    NbListModule,
    NbActionsModule,
    NbDialogModule.forChild(),
    NbContextMenuModule
  ]
})
export class AdminModule { }
