import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  uploadTypeForm: FormGroup;

  fetchNotificationUrl = environment.getNotificationUrl;

  dialogRef: MatDialogRef<TemplateRef<any>>;
  actionLoading: boolean;
  getNotifications: any[] = [];

  constructor(
    private crudService: CrudService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getNotification();
  }

  initForm() {
    this.uploadTypeForm = this.fb.group({
      uploadname: [null, Validators.required],
      uploadcat: [null, Validators.required]
    });
  }

  get uploadTypeFormData() {
    return this.uploadTypeForm.controls;
  }

  onSubmit(formPayload: { [key: string]: AbstractControl }) {
    const payload = {
      uploadname: formPayload.uploadname.value,
      uploadcat: formPayload.uploadcat.value
    };
    this.createUploadType(payload);
  }

  getNotification() {
    this.crudService.getData(this.fetchNotificationUrl).subscribe(
      data => {
        console.log("======fetchNotificationUrl========");
        console.log(data);
        if (data.responseCode === '00') {
          this.getNotifications = data.responseObject;
        } else if (data.responseObject === '99') {
          // console.log('error: ', error);
          this.toastr.error('Failed to fetch notifications', 'ERROR');
        }
      },
      error => {
        console.log('error: ', error);
        this.toastr.error('Failed to fetch notifications', 'ERROR');
      }
    );
  }

  createUploadType(payload) {
    this.actionLoading = true;
    const createUploadTypeUrl = "";
    this.crudService.createData(createUploadTypeUrl, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.actionLoading = false;
          this.clearForm(this.uploadTypeForm);
          this.close();
          this.toastr.success('Upload type Created', 'SUCCESSFUL');

        } else if (data.responseCode === '99') {
          this.actionLoading = false;
          this.toastr.error('Sorry, failed to create Upload type')
        }
      },
      error => {
        console.log('error: ', error);
        this.actionLoading = false;
        this.toastr.error('Sorry, failed to create Upload type')
      }
    )
  }

  deleteUploadType(payload) {
    console.log(payload);
    this.actionLoading = true;
    const deleteUnitUrl = "";
    this.crudService.deleteData(deleteUnitUrl, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.actionLoading = false;
          this.close();
          this.toastr.success('Upload type Deleted')
          
        } else if (data.responseCode === '99') {
          this.actionLoading = false;
          this.toastr.error('Sorry, failed to delete upload type')
        }
      },
      error => {
        console.log('error: ', error);
        this.actionLoading = false;
        this.toastr.error('Sorry, failed to delete upload type')
      }
    )
  }


  openModal(dialog: TemplateRef<any>, options?) {
   if (options) {
      console.log(options);
   }

    this.dialogRef = this.dialog.open(
      dialog,
      {
        data: options
      }
    );
  }

  submitModal(modalData) {
    console.log(modalData);
    const payload = {
      uploadid: modalData.extraData.id
    }
    this.deleteUploadType(payload);
  }

  clearForm(form: FormGroup) {
    form.reset();
  }

  close() {
    this.dialogRef.close();
  }

}
