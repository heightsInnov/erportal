
 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitDesignationsComponent } from './unit-designations/unit-designations.component';
import { UploadTypesComponent } from './upload-types/upload-types.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RouterModule, Routes } from '@angular/router';
import { SetupComponent } from './setup.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/shared/material.module';

const routes: Routes = [
  {
    path: '',
    component: SetupComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'unit-designation',
        component: UnitDesignationsComponent,
        data: { breadcrumb: 'Unit & Designations' },
        canActivate: [AuthGuard]
      },
      {
        path: 'uploadtypes',
        component: UploadTypesComponent,
        data: { breadcrumb: 'Upload types' },
        canActivate: [AuthGuard]
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        data: { breadcrumb: 'Notifications' },
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'unit-designation',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  declarations: [SetupComponent, UnitDesignationsComponent, UploadTypesComponent, NotificationsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SetupModule { }
