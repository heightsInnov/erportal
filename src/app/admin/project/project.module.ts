import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CreateProjectComponent } from './create-project/create-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { ProjectComponent } from './project.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MaterialModule } from 'src/app/core/shared/material.module';

const route: Routes = [
  {
    path: '',
    component: ProjectComponent,
    data: { breadcrumb: 'Handover' },
    canActivate: [AuthGuard]
  },
  {
    path: 'create-handover',
    component: CreateProjectComponent,
    data: { breadcrumb: 'Create Handover' },
    canActivate: [AuthGuard]
  },
  {
    path: 'update-handover',
    component: UpdateProjectComponent,
    data: { breadcrumb: 'Update Handover' },
    canActivate: [AuthGuard]
  },
  {
    path: 'view-handover',
    component: ViewProjectComponent,
    data: { breadcrumb: 'View Handover' },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [ProjectComponent, CreateProjectComponent, UpdateProjectComponent, ViewProjectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ReactiveFormsModule,
    MaterialModule,
    NgSelectModule
  ],
  providers: [DatePipe]
})
export class ProjectModule { }
