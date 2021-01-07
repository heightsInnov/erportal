import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveReportComponent } from './leave-report/leave-report.component';
import { ActivityReportComponent } from './activity-report/activity-report.component';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeReportComponent } from './employee-report/employee-report.component';
import { HandoverReportComponent } from './handover-report/handover-report.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from 'src/app/core/shared/material.module';

const routes: Routes = [
  {
    path: 'leave-report',
    component: LeaveReportComponent,
    data: { breadcrumb: 'Leave Report' },
    canActivate: [AuthGuard]
  },
  {
    path: 'activity-report',
    component: ActivityReportComponent,
    data: { breadcrumb: 'Activity Report' },
    canActivate: [AuthGuard]
  },
  {
    path: 'handover-report',
    component: HandoverReportComponent,
    data: { breadcrumb: 'Handover Report' },
    canActivate: [AuthGuard]
  },
  {
    path: 'employee-report',
    component: EmployeeReportComponent,
    data: { breadcrumb: 'Employee Report' },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [LeaveReportComponent, ActivityReportComponent, HandoverReportComponent, EmployeeReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgSelectModule,
    MaterialModule
  ]
})
export class ReportModule { }
