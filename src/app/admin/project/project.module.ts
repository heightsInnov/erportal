import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './create-project/create-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { ProjectComponent } from './project.component';
import { Routes, RouterModule } from '@angular/router';

const route: Routes = [
  {
    path: '',
    component: ProjectComponent
  },
  {
    path: 'create-project',
    component: CreateProjectComponent
  },
  {
    path: 'update-project',
    component: UpdateProjectComponent
  },
  {
    path: 'view-project',
    component: ViewProjectComponent
  }
];

@NgModule({
  declarations: [ProjectComponent, CreateProjectComponent, UpdateProjectComponent, ViewProjectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class ProjectModule { }
