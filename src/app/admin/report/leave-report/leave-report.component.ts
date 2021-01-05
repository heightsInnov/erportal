import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-leave-report',
  templateUrl: './leave-report.component.html',
  styleUrls: ['./leave-report.component.css']
})
export class LeaveReportComponent implements OnInit {

  filterForm: FormGroup;
  employeeDetails = JSON.parse(localStorage.getItem('user'));
  getLeaveUrl = environment.reportsUrl.leaveReport;
  leaveReports: any[] = [];
  payloadRange;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    ) { }

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
      start_date: formPayload.startDate.value,
      end_date: formPayload.endDate.value
    };
    this.payloadRange = payload;
    console.log(payload);
    this.getLeaveReport(payload);
  }

  getLeaveReport(filterBy?) {
    this.spinner.show();
    const leaveReportUrl = `${this.getLeaveUrl}/${this.employeeDetails.emp_id}`;
    const payload = filterBy || '';
    this.crudService.createData(leaveReportUrl, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.spinner.hide();
          this.leaveReports = data.responseObject;
        }
      },
      error => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  convertToCSV(objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let leaveData = '';

    for (let i = 0; i < array.length; i++) {
      let leave = '';
      for (const index in array[i]) {
        if (index) {
          if (leave !== '') {
            leave += ',';
          }
          leave += array[i][index];
        }
      }
      leaveData += leave + '\r\n';
    }
    return leaveData;
  }

  exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    const leaveJSON = JSON.stringify(items);
    // Create CSV File
    const csv = this.convertToCSV(leaveJSON);
    const fileName = `${fileTitle}.csv`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    this.spinner.hide();
    saveAs(blob, `${fileName}`);
    this.toastr.success(`${fileName} downloaded`, 'Download successful');
  }

  downloadReport() {
    this.spinner.show();
    const headers = {
      leaveNo: 'Leave No'.replace(/,/g, ''),
      leaveType: 'Leave Type'.replace(/,/g, ''),
      leaveDaysLeft: 'Leave Days Left'.replace(/,/g, ''),
      leaveStart: 'Leave Start'.replace(/,/g, ''),
      leaveEnd: ''.replace(/,/g, '') // remove commas to avoid errors
    };

    const leaveReports = this.leaveReports;

    const formattedLeaveReports = [];
    // format the data
    leaveReports.forEach((leave) => {
      const leaveStart = new Date(leave.start_date);
      const leaveEnd = new Date(leave.end_date);
      formattedLeaveReports.push({
        leaveNo: `${leave.leave_no}`,
        leaveType: `${leave.leave_type}`.replace(/,/g, ''), // remove commas to avoid errors
        leaveDaysLeft: `${leave.leave_left}`,
        leaveStart: `${leaveStart.toString()}`.slice(0, 15),
        leaveEnd: `${leaveEnd.toString()}`.slice(0, 15)
      });
    });

    const fileTitle = `leave_Report_from_${this.payloadRange.start_date}_to_${this.payloadRange.end_date}`; // or 'my-unique-title'
    console.log(`leaveReports: ${leaveReports}, fileTitle: ${fileTitle}`);
    // call the exportCSVFile() function to process the JSON and trigger the download
    this.exportCSVFile(headers, formattedLeaveReports, fileTitle);
  }

}
