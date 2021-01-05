import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './create-project/create-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { ProjectComponent } from './project.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NbStepperModule, NbCardModule, NbAccordionModule, NbTabsetModule } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const route: Routes = [
  {
    path: '',
    component: ProjectComponent,
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
    NbStepperModule,
    NbCardModule,
    NbAccordionModule,
    NbTabsetModule,
    NgSelectModule
  ]
})
export class ProjectModule { }
