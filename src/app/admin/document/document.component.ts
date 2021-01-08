import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ILeave } from 'src/app/core/models/ILeave';
import { CrudService } from 'src/app/core/services/crud.service';
import { GetDateRangeService } from 'src/app/core/services/get-date-range.service';
import { CustomDayRangeSelector } from 'src/app/core/shared/custom-day-range-selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
  providers: [{
                provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
                useClass: CustomDayRangeSelector
              }]
})

export class DocumentComponent implements OnInit {
  leaveForm: FormGroup;
  getLeaveUrl = environment.getLeaveUrl;
  createLeaveUrl = environment.createLeaveUrl;
  userDetails = JSON.parse(localStorage.getItem('user'));
  leaves: any[] = [];
  leaveType = [
    {name: 'ANNUAL LEAVE', value: 'annual'},
    {name: 'PATERNAL LEAVE', value: 'paternal'},
    {name: 'MATERNAL LEAVE', value: 'maternal'},
    {name: 'SICK LEAVE', value: 'sick'}
  ];
  dialogRef: MatDialogRef<TemplateRef<any>>;

  constructor(
    private dialog: MatDialog,
    private route: Router,
    private crudService: CrudService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private dayRange: GetDateRangeService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getLeaves();
  }

  initForm(){
    this.leaveForm = this.fb.group({
      leave_no: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      leave_type: [null, Validators.required],
      leave_date: this.fb.group({
                                  start_date: [null, Validators.required],
                                  end_date: [null, Validators.required]
                                })
    });
  }

  get leaveFormData() {
    return this.leaveForm.controls;
  }

  getLeaveDays(value) {
    if (value !== undefined || value !== null) {
      this.dayRange.changeRange(+value - 1);
      this.leaveFormData.leave_date.reset();
    } else {
      this.dayRange.changeRange(0);
    }
  }

  openModal(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialog.open(dialog);
  }

  getLeaves() {
    const url = `${this.getLeaveUrl}/${this.userDetails.emp_id}`;
    this.crudService.getData(url).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.leaves = data.responseObject;
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  onSubmit(formPayload) {
    console.log(formPayload);
    const payload: ILeave = {
      leave_no: +formPayload.leave_no.value,
      leave_type: formPayload.leave_type.value,
      start_date: formPayload.leave_date.value.start_date,
      end_date: formPayload.leave_date.value.end_date
    };
    console.log(payload);
    this.createLeave(`${this.createLeaveUrl}/${this.userDetails.emp_id}`, payload);
  }

  createLeave(url: string, payload: ILeave) {
    this.crudService.createData(url, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.close();
          this.toastr.success('Leave Application Created', 'SUCCESSFUL');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  clearForm(form: FormGroup) {
    form.reset();
  }

  close() {
    this.dialogRef.close();
  }
}

