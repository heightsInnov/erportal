import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity-report',
  templateUrl: './activity-report.component.html',
  styleUrls: ['./activity-report.component.css']
})
export class ActivityReportComponent implements OnInit {

  filterForm: FormGroup;
  employeeDetails = JSON.parse(localStorage.getItem('user'));
  getActivityReportUrl = environment.reportsUrl.activityReport;
  activityReports: any;
  activityStatus = [{value: 'P', name: 'Todo'}, {value: 'O', name: 'In Progress'}, {value: 'C', name: 'Completed'}];
  activityPeriods = [
                      {value: 'D', name: 'Daily'},
                      {value: 'W', name: 'Weekly'},
                      {value: 'M', name: 'Monthly'},
                      {value: 'Q', name: 'Quaterly'},
                      {value: 'Y', name: 'Yearly'}
                    ];
  filterBy = [
                {value: 'status', name: 'Activity Status'},
                {value: 'unit', name: 'Unit'},
                {value: 'period', name: 'Frequency'},
                {value: 'date', name: 'Date'},
                {value: 'custom', name: 'Custom'}
              ];
  filterOption: string;
  units$: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getActivityReport();
  }

  initForm() {
    this.filterForm = this.fb.group({
      filter_by: [null, Validators.required],
      status_code: [null],
      period: [null],
      unit_code: [null],
      start_date: [null, Validators.required],
      end_date: [null, Validators.required]
    });
  }
  get filterFormData() {
    return this.filterForm.controls;
  }

  onSubmit(formPayload) {
    console.log(formPayload);
    const payload = {};
    for (const item in formPayload) {
      if (item !== 'filter_by' && formPayload[item].value !== null) {
        payload[item] = formPayload[item].value;
      }
    }
    console.log('payload = ', payload);
    this.getActivityReport(payload);
  }

  getActivityReport(filterBy?) {
    if (filterBy && filterBy.hasOwnProperty('period')) {
      this.getActivityReportByFrequency(filterBy);
    } else {
      const activityReportUrl = `${this.getActivityReportUrl}/${this.employeeDetails.emp_id}`;
      const payload = filterBy || '';
      this.crudService.createData(activityReportUrl, payload).subscribe(
        data => {
          console.log(data);
          if (data.responseCode === '00') {
            this.activityReports = data.responseObject;
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  getActivityReportByFrequency(filter) {
    const activityReportUrl = `${this.getActivityReportUrl}/${this.employeeDetails.emp_id}/${filter.period}`;
    this.crudService.getData(activityReportUrl).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.activityReports = data.responseObject;
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
          this.units$ = of(data.responseObject.unit);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  downloadReport() {
    console.log('download clicked');
  }

  displayFilter(filterselection) {
    console.log(filterselection);
    this.filterOption = filterselection;
  }

}
