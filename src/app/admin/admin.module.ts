import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../core/guards/auth.guard';
import { MaterialModule } from '../core/shared/material.module';
import { ActivityComponent } from './activity/activity.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'activity',
        component: ActivityComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Activity' },
      },
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Employee' },
      },
      {
        path: 'handover',
        loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Handover' },
      },
      {
        path: 'leave',
        loadChildren: () => import('./document/document.module').then(m => m.DocumentModule),
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Leave' },
      },
      {
        path: 'report',
        loadChildren: () => import('./report/report.module').then(m => m.ReportModule),
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Report' },
      },
      {
        path: 'documents',
        loadChildren: () => import('./e-document/e-document.module').then(m => m.EDocumentModule),
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Documents' },
      }
    ]
  },

];

@NgModule({
  declarations: [AdminComponent, DashboardComponent, ActivityComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    LayoutModule,
    MaterialModule
  ]
})
export class AdminModule { }
