import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';

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
  handoverReports: any;
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
    private crudService: CrudService) { }

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
    const handoverReportUrl = `${this.getHandoverReportUrl}/${this.employeeDetails.emp_id}`;
    const payload = filterBy || '';
    this.crudService.createData(handoverReportUrl, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.handoverReports = data.responseObject;
        }
      },
      error => {
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

  downloadReport() {
    console.log('download clicked');
  }

  displayFilter(filterselection) {
    console.log(filterselection);
    this.filterOption = filterselection;
  }
}
