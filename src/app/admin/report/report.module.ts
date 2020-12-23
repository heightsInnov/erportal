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

const routes: Routes = [
  {
    path: 'leave-report',
    component: LeaveReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'activity-report',
    component: ActivityReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'handover-report',
    component: HandoverReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee-report',
    component: EmployeeReportComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [LeaveReportComponent, ActivityReportComponent, HandoverReportComponent, EmployeeReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class ReportModule { }
