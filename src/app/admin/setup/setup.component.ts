import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  setupTabs: ISetupTabs[]  = [
    {
      name: 'UNIT & DESIGNATIONS',
      route: './unit-designation'
    },
    {
      name: 'UPLOAD TYPES',
      route: './uploadtypes'
    },
    {
      name: 'NOTIFICATIONS',
      route: './notifications'
    }
  ]

  setupTypes = [
    {
      type: 'units',
      url: `${environment.setupUrl.units}?action=C`
    },
    {
      type: 'designations',
      url: `${environment.setupUrl.designations}?action=C`
    },
    {
      type: 'upload_type',
      url: environment.setupUrl.upload_type
    },
    {
      type: 'notification_messages',
      url: environment.setupUrl.notification_messages.get
    },
    {
      type: 'email_receiver',
      url: environment.setupUrl.email_receiver.get
    }
  ];

  notificationForm: FormGroup;
  emailForm: FormGroup;

  constructor(
    private crudService: CrudService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    // this.getSetups();
  }

  initForm() {

    this.notificationForm = this.fb.group({
      not_category: [null, Validators.required],
      not_sms_msg: [null, Validators.required],
      not_email_msg: [null, Validators.required],
      not_type: [null, Validators.required],
      not_created_by: [null, Validators.required],
      not_created_date: [null, Validators.required],
      not_id: [null, Validators.required],
      not_subject: [null, Validators.required],
      not_compulsory: [null, Validators.required]
    });

    this.emailForm = this.fb.group({
      noe_email: [null, Validators.required],
      noe_daily: [null, Validators.required],
      noe_weekly: [null, Validators.required],
      noe_monthly: [null, Validators.required],
      noe_quaterly: [null, Validators.required],
      noe_yearly: [null, Validators.required]
    });
  }


  get notificationFormData() {
    return this.notificationForm.controls;
  }

  get emailFormData() {
    return this.emailForm.controls;
  }

  onSubmit(formPayload: { [key: string]: AbstractControl}, formname: string) {
    if (formname === 'uploadTypeForm') {
      console.log(formPayload);
    } else if (formname === 'notificationForm') {
      console.log(formPayload);
    } else if (formname === 'emailForm') {
      console.log(formPayload);
    }
  }

  // configureUnits(payload, url) {

  // }

  // configureDesignations(payload, url) {

  // }

  // configureUploadTypes(payload, url) {

  // }

  // configureNotifications(payload, url) {

  // }

  getSetups() {
    for (const setup of this.setupTypes) {
      this.crudService.getData(setup.url).subscribe(
        data => {
          console.log(`${setup.type}: `, data);
        }
      )
    }
  }
}

export interface ISetupTabs {
  name: string;
  route: string;
}
