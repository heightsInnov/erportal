import { Component, Inject, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import { NbDialogRef, NbDialogService, NbMenuService, NbOverlayRef, NB_WINDOW } from '@nebular/theme';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICreateActivity, IUpdateActivity } from 'src/app/core/models/IActivity';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  activityStatusModal: TemplateRef<any>;
  form: FormGroup;
  payload: ICreateActivity;
  updatePayload: IUpdateActivity;
  createActivityUrl = environment.createActivityUrl;
  updateActivityUrl = environment.updateActivityUrl;
  getUnitsUrl = environment.getUnitsUrl;
  getActivityUrl = environment.getActivityUrl;
  getActivityStatusUrl = environment.getActivityStatusURL;
  updateActivityStatusURL = environment.updateActivityStatusURL;
  activityStatuses: any[] = [];
  todos: any[] = [];
  inProgress: any[] = [];
  completed: any[] = [];
  units: any[] = [];
  activityId: string;
  activityIdForStatus = '';
  userDetails = JSON.parse(localStorage.getItem('user'));
  activityActions = [
                      {title: 'in progress', data: this.activityIdForStatus},
                      {title: 'completed', data: this.activityIdForStatus}
                    ];
  closeModal = false;
  loginError: {status: boolean, message: string} = {status: false, message: ''};
  dialogRef: any;
  activities: any[];
  todoStatus: string;
  inProgressStatus: string;
  completedStatus: string;

  constructor(
    private dialogService: NbDialogService,
    // protected dialogRef: NbDialogRef<>,
    private fb: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private toastr: ToastrService,
    private nbMenuService: NbMenuService,
    @Inject(NB_WINDOW) private window
  ) { }

  ngOnInit(): void {
    this.initForm(); // initialize reactive form on component init
    this.getUnits(this.getUnitsUrl); // get units/depts for activity
    this.getActivities(this.getActivityUrl);
    this.getActivityStatus(this.getActivityStatusUrl);
    // this.checkAvailabilty();
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'activity-actions'),
        map(({ item: { title, data }}) => {
          return {action: title, id: data};
        }),
      )
      .subscribe(menu => {
        this.window.alert(`${menu.action} with ${menu.id} was clicked!`);
        this.open(this.activityStatusModal,
                    {
                      action: menu.action,
                      question: `do you want to move this activity to ${menu.action}?`,
                      statusCode: menu.action === 'completed' ? 'C' : 'O',
                      // id: menu.id
                      id: this.activityIdForStatus
                    },
                  );
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

  onSubmit(formPayload, modalRef, action) {
    this.dialogRef = modalRef;
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
          this.units = data.responseObject;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  open(dialog: TemplateRef<any>, options, updateObj?) {
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
    this.dialogService.open(
      dialog,
      {
        context: {
                    title: options
                 }
      }
    );
  }

  changeActivityStatus(activityId, status, modalRef) {
    this.dialogRef = modalRef;
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

  getActivityId(activity: string, template: TemplateRef<any>) {
    console.log(`this is the activityId: ${activity}`);
    console.log(`this is the template: ${template}`);
    this.activityIdForStatus = activity;
    this.activityStatusModal = template;
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
