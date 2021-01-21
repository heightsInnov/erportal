import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICreateActivity, IUpdateActivity } from 'src/app/core/models/IActivity';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';
import { filter, map } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  @ViewChild('activityStatusModal') activityStatusModal: TemplateRef<any>;
  @ViewChild('activityModal') activityModal: TemplateRef<any>;

  form: FormGroup;
  payload: ICreateActivity;
  updatePayload: IUpdateActivity;
  createActivityUrl = environment.createActivityUrl;
  updateActivityUrl = environment.updateActivityUrl;
  getUnitsUrl = environment.getUnitsUrl;
  getActivityUrl = environment.getActivityUrl;
  getActivityStatusUrl = environment.getActivityStatusURL;
  updateActivityStatusURL = environment.updateActivityStatusURL;
  dashboardUrl = environment.dashboardUrl;
  activityStatuses: any[] = [];
  todos: any[] = [];
  inProgress: any[] = [];
  completed: any[] = [];
  units: any[] = [];
  activityId: string;
  activityIdForStatus = '';
  userDetails = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
  activityActions = [
    {title: 'in progress', icon: 'arrow_forward', method: 'in_progress'},
    {title: 'completed', icon: 'double_arrow', method: 'completed'},
    {title: 'update', icon: 'update', method: 'update'}
  ];
  todoActions = this.activityActions.filter(action => action.method !== 'completed');
  ongoingActions = this.activityActions.filter(action => action.method !== 'in_progress');
  closeModal = false;
  loginError: {status: boolean, message: string} = {status: false, message: ''};
  dialogRef: MatDialogRef<TemplateRef<any>>;
  activities: any[];
  todoStatus: string;
  inProgressStatus: string;
  completedStatus: string;
  modal = {name: '', action: ''};
  dashboardData;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initForm(); // initialize reactive form on component init
    this.getUnits(this.getUnitsUrl); // get units/depts for activity
    this.getActivities(this.getActivityUrl);
    // this.getActivityStatus(this.getActivityStatusUrl);
    // this.checkAvailabilty();
    this.loadDashboard(this.dashboardUrl);
  }

  loadDashboard(url: string) {
    this.crudService.getData(url).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.dashboardData = data.responseObject[0];
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  // build form controls
  initForm(): void {
    this.form = this.fb.group({
      unit: ['', Validators.required],
      activity: [null, Validators.required],
      objective: [null, Validators.required],
      remark: [null, Validators.required],
      status: ['']
    });
  }

  get formData() {
    return this.form.controls;
  }

  onSubmit(formPayload, action) {
    if (action === 'create') {
      this.payload = {
                      unit: formPayload.unit.value,
                      activity: formPayload.activity.value,
                      objectives: formPayload.objective.value,
                      remarks: formPayload.remark.value,
                     };
      console.log('payload: ', this.payload);
      this.createActivity(this.createActivityUrl, this.payload);
    } else if (action === 'update') {
      this.updatePayload = {
                            activityId: this.activityId,
                            unit: formPayload.unit.value,
                            activity: formPayload.activity.value,
                            objectives: formPayload.objective.value,
                            remarks: formPayload.remark.value,
                            // status: formPayload.status.value
                          };
      console.log('payload: ', this.updatePayload);
      this.updateActivity(this.updateActivityUrl, this.updatePayload);
    }
  }

  createActivity(url: string, payload: ICreateActivity) {
    const path = `${url}/${this.userDetails.emp_username}`;
    this.crudService.createData(path, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00'){
          this.toastr.success('Activity Created', 'Successful');
          this.getActivities(this.getActivityUrl);
          this.clearForm();
          this.close();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  updateActivity(url: string, payload: IUpdateActivity) {
    this.crudService.updateData(url, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00'){
          this.toastr.success('Activity Updated', 'Successful');
          this.getActivities(this.getActivityUrl);
          this.clearForm();
          this.close();
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  // checkAvailabilty() {
  //   if (this.activities === []) {
  //     return 'no activity created';
  //   } else if (this.activities !== []) {
  //     if (this.todos === []) {
  //       this.todoStatus = 'no pending activities for today';
  //     } else {
  //       this.todoStatus = 'pending activities';
  //     }
  //     if (this.inProgress === []) {
  //       this.inProgressStatus = 'no ongoing activities for today';
  //     } else {
  //       this.inProgressStatus = 'ongoing activities';
  //     }
  //     if (this.completed === []) {
  //       this.completedStatus = 'no completed activities for today';
  //     } else {
  //       this.completedStatus = 'completed activities';
  //     }
  //     return 'activities created';
  //   }
  // }
  getActivities(url: string) {
    const path = `${url}/${this.userDetails.emp_username}/A`;
    this.crudService.getData(path).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00'){
          if (data.responseObject) {
            this.activities = data.responseObject;
            this.todos = [];
            this.inProgress = [];
            this.completed = [];
            this.activities.forEach(activity => {
              if (activity.status === 'P') {
                this.todos.push(activity);
              } else if (activity.status === 'O') {
                this.inProgress.push(activity);
              } else if (activity.status === 'C') {
                this.completed.push(activity);
              }
            });
            // this.checkAvailabilty();
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getActivityStatus(url: string) {
    this.crudService.getData(url).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00'){
          this.activityStatuses = data.responseObject;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getUnits(url: string) {
    this.crudService.getData(url).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00'){
          this.units = data.responseObject.unit;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getOptionMethod(action, activity){
    if (action.method === 'in_progress' || action.method === 'completed') {
      // if (action === 'in_progress' || action === 'completed') {
      const modal: TemplateRef<any> = this.activityStatusModal;
      this.openModal(modal,
        {
          action: action.title,
          question: `do you want to move this activity to ${action.title}?`,
          statusCode: action.title === 'completed' ? 'C' : 'O',
          id: activity.activityId
        }
        // {
        //   action,
        //   question: `do you want to move this activity to ${action}?`,
        //   statusCode: action === 'completed' ? 'C' : 'O',
        //   id: activity
        // }
      );
    } else if ( action.method === 'update' ) {
    // } else if ( action === 'update' ) {
      const modal: TemplateRef<any> = this.activityModal;
      this.openModal(modal, action.title, activity);
      // this.openModal(modal, action);
    }

  }

  openModal(dialog: TemplateRef<any>, options, updateObj?) {
    if (updateObj) {
      this.activityId = updateObj.activityId;
      this.form.patchValue({
        unit: updateObj.unit.unit_code,
        activity: updateObj.activity,
        objective: updateObj.objectives,
        remark: updateObj.remarks,
        // status: updateObj.status
      });
    }
    this.dialogRef = this.dialog.open(
      dialog,
      {
        data: options
      }
    );
  }


  changeActivityStatus(activityId, status) {
    const payload = {activityId, status};
    console.log(payload);
    this.crudService.updateData(this.updateActivityStatusURL, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00'){
          this.getActivities(this.getActivityUrl);
          if (status === 'O') {
            this.toastr.info('Moved to \'In Progress\'', '');
          } else if (status === 'C') {
            this.toastr.info('Moved to \'Completed\'', 'Successful');
          }
          this.close();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  clearForm() {
    this.form.reset();
  }

  close() {
    this.dialogRef.close();
  }

  getTodaysDate() {
    const date = new Date().toDateString();
    return date;
  }

}
