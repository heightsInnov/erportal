import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private crudService: CrudService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
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
      this.spinner.show();
      const activityReportUrl = `${this.getActivityReportUrl}/${this.employeeDetails.emp_id}`;
      const payload = filterBy || '';
      this.crudService.createData(activityReportUrl, payload).subscribe(
        data => {
          console.log(data);
          if (data.responseCode === '00') {
            this.spinner.hide();
            this.activityReports = data.responseObject;
          }
        },
        error => {
          this.spinner.hide();
          console.log(error);
        }
      );
    }
  }

  getActivityReportByFrequency(filter) {
    this.spinner.show();
    const activityReportUrl = `${this.getActivityReportUrl}/${this.employeeDetails.emp_id}/${filter.period}`;
    this.crudService.getData(activityReportUrl).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.spinner.hide();
          this.activityReports = data.responseObject.activities;
        }
      },
      error => {
        this.spinner.hide();
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

  displayFilter(filterselection) {
    console.log(filterselection);
    this.filterOption = filterselection;
  }

  convertToCSV(objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let activityData = '';

    for (let i = 0; i < array.length; i++) {
      let activity = '';
      for (const index in array[i]) {
        if (index) {
          if (activity !== '') {
            activity += ',';
          }
          activity += array[i][index];
        }
      }
      activityData += activity + '\r\n';
    }
    return activityData;
  }

  exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    const activityJSON = JSON.stringify(items);
    // Create CSV File
    const csv = this.convertToCSV(activityJSON);
    const fileName = `${fileTitle}.csv`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    this.spinner.hide();
    saveAs(blob, `${fileName}`);
    this.toastr.success(`${fileName} downloaded`, 'Download successful');
  }

  downloadReport() {
    this.spinner.show();
    const headers = {
      activity: 'Activity',
      objective: 'Objective',
      unit: 'Unit',
      status: 'Status',
      remarks: 'Remarks',
      activityDate: 'Activity Date'.replace(/,/g, '') // remove commas to avoid errors
    };

    const activityReports = this.activityReports;

    const formattedactivityReports = [];
    // format the data
    activityReports.forEach((activity) => {
      const activityDate = new Date(activity.activity_date);
      formattedactivityReports.push({
        activity: `${activity.activity}`.replace(/,/g, ''), // remove commas to avoid errors
        objective: `${activity.objectives}`,
        unit: `${activity.units}`.replace(/,/g, ''),
        status: `${activity.status}`,
        remarks: `${activity.remarks}`.replace(/,/g, ''),
        activityDate: `${activityDate.toString()}`.slice(0, 15),
      });
    });

    const fileTitle = `Activity_Report`; // or 'my-unique-title'
    console.log(`activityReports: ${activityReports}, fileTitle: ${fileTitle}`);
    // call the exportCSVFile() function to process the JSON and trigger the download
    this.exportCSVFile(headers, formattedactivityReports, fileTitle);
  }
}
