import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-handover-report',
  templateUrl: './handover-report.component.html',
  styleUrls: ['./handover-report.component.css']
})
export class HandoverReportComponent implements OnInit {

  filterForm: FormGroup;
  employeeDetails = JSON.parse(localStorage.getItem('user'));
  getHandoverReportUrl = environment.reportsUrl.handoverReport;
  employeeUrl = environment.getAllEmployeeUrl;
  handoverReports: any[] = [];
  handoverReasons = ['Annual Leave', 'Final Exit', 'Reassignment'];
  filterBy = [
                {value: 'takeover_staff', name: 'Takeover Staff'},
                {value: 'handover_reason', name: 'Handover Reason'},
                {value: 'date', name: 'Date'},
                {value: 'custom', name: 'Custom'}
              ];
  filterOption: string;
  employees$: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.getHandoverReport();
  }

  initForm() {
    this.filterForm = this.fb.group({
      filter_by: [null, Validators.required],
      takeover_name_id: [null],
      handover_reason: [null],
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
    console.log(payload);
    this.getHandoverReport(payload);
  }

  getHandoverReport(filterBy?) {
    this.spinner.show();
    const handoverReportUrl = `${this.getHandoverReportUrl}/${this.employeeDetails.emp_id}`;
    const payload = filterBy || '';
    this.crudService.createData(handoverReportUrl, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.spinner.hide();
          this.handoverReports = data.responseObject;
        }
      },
      error => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  getEmployees() {
    this.crudService.getData(this.employeeUrl).subscribe(
      data => {
        console.log(data);
        let response = [];
        if (data.responseCode === '00') {
          response = data.responseObject.map(emp => {
            return {name: `${emp.emp_firstname} ${emp.emp_lastname}`, id: emp.emp_id};
          });
          this.employees$ = of(response);
          console.log(this.employees$);
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
    let handoverData = '';

    for (let i = 0; i < array.length; i++) {
      let handover = '';
      for (const index in array[i]) {
        if (index) {
          if (handover !== '') {
            handover += ',';
          }
          handover += array[i][index];
        }
      }
      handoverData += handover + '\r\n';
    }
    return handoverData;
  }

  exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    const handoverJSON = JSON.stringify(items);
    // Create CSV File
    const csv = this.convertToCSV(handoverJSON);
    const fileName = `${fileTitle}.csv`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    this.spinner.hide();
    saveAs(blob, `${fileName}`);
    this.toastr.success(`${fileName} downloaded`, 'Download successful');
  }

  downloadReport() {
    this.spinner.show();
    const headers = {
      staffId: 'Staff Id'.replace(/,/g, ''),
      resigneeName: 'Resignee Name'.replace(/,/g, ''),
      resigneeAddress: 'Resignee Address'.replace(/,/g, ''),
      resigneePhone: 'Resignee Phone'.replace(/,/g, ''),
      takeoverName: 'Takeover Name'.replace(/,/g, ''),
      handoverEffectiveDate: 'Handover Effective Date'.replace(/,/g, ''),
      handoverReason: 'Handover Reason'.replace(/,/g, ''),
      handoverWitness: 'Handover Witness'.replace(/,/g, '') // remove commas to avoid errors
    };

    const handoverReports = this.handoverReports;

    const formattedhandoverReports = [];
    // format the data
    handoverReports.forEach((handover) => {
      const handoverEffectiveDate = new Date(handover.handover_effective_date);
      formattedhandoverReports.push({
        staffId: `${handover.staff_id}`,
        resigneeName: `${handover.resignee_name}`.replace(/,/g, ''), // remove commas to avoid errors
        resigneeAddress: `${handover.resignee_address}`.replace(/,/g, ''),
        resigneePhone: `${handover.resignee_phone}`,
        takeoverName: `${handover.takeover_name}`.replace(/,/g, ''),
        handoverEffectiveDate: `${handoverEffectiveDate.toString()}`.slice(0, 15),
        handoverReason: `${handover.handover_reason}`.replace(/,/g, ''),
        handoverWitness: `${handover.handover_witness}`.replace(/,/g, ''),
      });
    });

    const fileTitle = `handover_Report`; // or 'my-unique-title'
    console.log(`handoverReports: ${handoverReports}, fileTitle: ${fileTitle}`);
    // call the exportCSVFile() function to process the JSON and trigger the download
    this.exportCSVFile(headers, formattedhandoverReports, fileTitle);
  }
}
