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
  notificationForm: FormGroup;
  fetchNotificationUrl = environment.setupUrl.notification_messages.get;
  updateNotificationUrl = environment.setupUrl.notification_messages.update;

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
    this.init();
  }

  init(){
    this.initForm();
    this.getNotification();
  }

  initForm() {
    this.notificationForm = this.fb.group({
      not_sms_msg: [null],
      not_email_msg: [null],
      not_subject: [null],
      not_id: [null]
    })
  }

  get notificationFormData() {
    return this.notificationForm.controls;
  }

  onSubmit(formPayload) {
    console.log(formPayload)
    const payload = {
      not_id: formPayload.not_id.value,
      not_sms_msg: formPayload.not_sms_msg.value,
      not_email_msg: formPayload.not_email_msg.value,
      not_subject: formPayload.not_subject.value
    };
    this.updateNotification(payload);
  }

  getNotification() {
    this.crudService.getData(this.fetchNotificationUrl).subscribe(
      data => {
        if (data.responseCode === '00') {
          this.getNotifications = data.responseObject;
        } else if (data.responseObject === '99') {
          this.toastr.error('Failed to fetch notifications', 'ERROR');
        }
      },
      error => {
        console.log('error: ', error);
        this.toastr.error('Failed to fetch notifications', 'ERROR');
      }
    );
  }

  updateNotification(payload) {
    this.actionLoading = true;
    this.crudService.updateData(this.updateNotificationUrl, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.actionLoading = false;
          this.clearForm();
          this.close();
          this.toastr.success('Notification Updated', 'SUCCESSFUL');
          this.init();
        } else if (data.responseCode === '99') {
          this.actionLoading = false;
          this.toastr.error('Sorry, failed to update Notification')
        }
      },
      error => {
        console.log('error: ', error);
        this.actionLoading = false;
        this.toastr.error('Sorry, failed to update Notification')
      }
    )
  }

  openModal(dialog: TemplateRef<any>, data) {
    this.notificationForm.patchValue({
      not_sms_msg: data.not_sms_msg,
      not_email_msg: data.not_email_msg,
      not_subject: data.not_subject,
      not_id: data.not_id
    });
    this.dialogRef = this.dialog.open(
      dialog
    );
  }

  clearForm() {
    this.notificationForm.reset();
  }

  close() {
    this.clearForm();
    this.dialogRef.close();
  }

}
