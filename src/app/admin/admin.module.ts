import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NbLayoutModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';

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
        path: 'budget',
        loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule)
      },
      {
        path: 'project',
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
    LayoutModule,
    NbLayoutModule,
    NbSidebarModule
  ]
})
export class AdminModule { }
