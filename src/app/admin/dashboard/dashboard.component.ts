import { Component, Inject, OnInit, TemplateRef} from '@angular/core';
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
export class DashboardComponent implements OnInit {

  form: FormGroup;
  payload: ICreateActivity;
  updatePayload: IUpdateActivity;
  createActivityUrl = environment.createActivityUrl;
  updateActivityUrl = environment.updateActivityUrl;
  getUnitsUrl = environment.getUnitsUrl;
  getActivityUrl = environment.getActivityUrl;
  getActivityStatusUrl = environment.getActivityStatusURL;
  activityStatuses: any[] = [];
  todos: any[] = [];
  inProgress: any[] = [];
  completed: any[] = [];
  units: any[] = [];
  activityId: string;
  userDetails = JSON.parse(localStorage.getItem('user'));
  activityActions = [
                      {title: 'in progress'},
                      {title: 'completed'}
                    ];
  closeModal = false;
  loginError: {status: boolean, message: string} = {status: false, message: ''};
  dialogRef: any;

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
    this.getActivityStatus(this.getActivityStatusUrl)
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'activity-actions'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => this.window.alert(`${title} was clicked!`));
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
        if (data.responseCode === '00' && data.responseMessage === 'SUCCESS;'){
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
        if (data.responseCode === '00' && data.responseMessage === 'SUCCESS;'){
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

  getActivities(url: string) {
    const path = `${url}/${this.userDetails.emp_username}/A`;
    this.crudService.getData(path).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00' && data.responseMessage === 'SUCCESS;'){
          if (data.responseObject) {
            data.responseObject.forEach(activity => {
              if (activity.status === 'P') {
                this.todos.push(activity);
              } else if (activity.status === 'O') {
                this.inProgress.push(activity);
              } else if (activity.status === 'C') {
                this.completed.push(activity);
              }
            });
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
        if (data.responseCode === '00' && data.responseMessage === 'SUCCESS;'){
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
        if (data.responseCode === '00' && data.responseMessage === 'SUCCESS;'){
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

  clearForm() {
    this.form.reset();
  }

  close() {
    this.dialogRef.close();
  }

}
