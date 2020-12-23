import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-leave-report',
  templateUrl: './leave-report.component.html',
  styleUrls: ['./leave-report.component.css']
})
export class LeaveReportComponent implements OnInit {

  filterForm: FormGroup;
  employeeDetails = JSON.parse(localStorage.getItem('user'));
  getLeaveUrl = environment.reportsUrl.leaveReport;
  leaveReports: any;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService) { }

  ngOnInit(): void {
    this.initForm();
    this.getLeaveReport();
  }

  initForm() {
    this.filterForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  get filterFormData() {
    return this.filterForm.controls;
  }

  onSubmit(formPayload) {
    const payload = {
      startDate: formPayload.startDate.value,
      endDate: formPayload.endDate.value
    };
    console.log(payload);
    this.getLeaveReport(payload);
  }

  getLeaveReport(filterBy?) {
    const leaveReportUrl = `${this.getLeaveUrl}/${this.employeeDetails.emp_id}`;
    const payload = filterBy || '';
    this.crudService.createData(leaveReportUrl, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.leaveReports = data.responseObject;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
