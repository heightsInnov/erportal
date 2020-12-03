import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './create-project/create-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { ProjectComponent } from './project.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NbStepperModule, NbCardModule, NbAccordionModule, NbTabsetModule } from '@nebular/theme';

const route: Routes = [
  {
    path: '',
    component: ProjectComponent
  },
  {
    path: 'create-handover',
    component: CreateProjectComponent
  },
  {
    path: 'update-handover',
    component: UpdateProjectComponent
  },
  {
    path: 'view-handover',
    component: ViewProjectComponent
  }
];

@NgModule({
  declarations: [ProjectComponent, CreateProjectComponent, UpdateProjectComponent, ViewProjectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ReactiveFormsModule,
    NbStepperModule,
    NbCardModule,
    NbAccordionModule,
    NbTabsetModule,
  ]
})
export class ProjectModule { }
