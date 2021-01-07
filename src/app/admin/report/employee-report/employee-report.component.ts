import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.css']
})
export class EmployeeReportComponent implements OnInit {

  filterForm: FormGroup;
  employeeDetails = JSON.parse(localStorage.getItem('user'));
  getEmployeeReportUrl = environment.reportsUrl.employeeReport;
  employeeUrl = environment.getAllEmployeeUrl;
  employeeReports: any[] = [];
  defaultPeriods = [
    {value: 'D', name: 'Daily'},
    {value: 'W', name: 'Weekly'},
    {value: 'M', name: 'Monthly'},
    {value: 'Q', name: 'Quaterly'},
    {value: 'Y', name: 'Yearly'}
  ];
  filterBy = [
                {value: 'period', name: 'Frequency'},
                {value: 'date', name: 'Date'},
              ];
  filterOption: string;
  // employees$: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getEmployeeReport();
  }

  initForm() {
    this.filterForm = this.fb.group({
      filter_by: [null, Validators.required],
      period: [null],
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
    this.getEmployeeReport(payload);
  }

  getEmployeeReport(filterBy?) {
    this.spinner.show();
    const employeeReportUrl = `${this.getEmployeeReportUrl}/${this.employeeDetails.emp_id}`;
    const payload = filterBy || '';
    this.crudService.createData(employeeReportUrl, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.spinner.hide();
          this.employeeReports = data.responseObject;
        }
      },
      error => {
        this.spinner.hide();
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
    let employeeData = '';

    for (let i = 0; i < array.length; i++) {
      let employee = '';
      for (const index in array[i]) {
        if (index) {
          if (employee !== '') {
            employee += ',';
          }
          employee += array[i][index];
        }
      }
      employeeData += employee + '\r\n';
    }
    return employeeData;
  }

  exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    const employeeJSON = JSON.stringify(items);
    // Create CSV File
    const csv = this.convertToCSV(employeeJSON);
    const fileName = `${fileTitle}.csv`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    this.spinner.hide();
    saveAs(blob, `${fileName}`);
    this.toastr.success(`${fileName} downloaded`, 'Download successful');
  }

  downloadReport() {
    this.spinner.show();
    const headers = {
      id: 'Id',
      username: 'Username',
      email: 'Email',
      phone: 'Phone',
      gsm: 'Gsm',
      state: 'State',
      nationality: 'Nationality',
      age: 'Age',
      gender: 'Gender',
      id_no: 'Id No'.replace(/,/g, ''), // remove commas to avoid errors
      id_type: 'Id Type'.replace(/,/g, ''),
      creation_date: 'Creation Date'.replace(/,/g, ''),
      religion: 'Religion',
      marital_status: 'Marital Status'.replace(/,/g, ''),
      employment_date: 'Employment Date'.replace(/,/g, ''),
      date_of_first_employment: 'Date of First Employment'.replace(/,/g, ''),
      confirmation_date: 'Confirmation Date'.replace(/,/g, ''),
      current_department: 'Current Department'.replace(/,/g, ''),
      present_posting_deployment: 'Present Posting Deployment'.replace(/,/g, ''),
      present_posting_date: 'Present Posting Date'.replace(/,/g, ''),
      retirement_date: 'Retirement Date'.replace(/,/g, ''),
      leaves_left: 'Leaves Left'.replace(/,/g, '')
    };

    const employeeReports = this.employeeReports;

    const formattedEmployeeReports = [];
    // format the data
    employeeReports.forEach((employee) => {
      const creationDate = new Date(employee.emp_creation_date);
      const employmentDate = new Date(employee.emp_employment_date);
      const dateOfFirstEmployment = new Date(employee.emp_date_of_first_employment);
      const confirmationDate = new Date(employee.emp_confirmation_date);
      const presentPostingDate = new Date(employee.emp_present_posting_date);
      const retirementDate = new Date(employee.emp_retirement_date);
      formattedEmployeeReports.push({
        id: `${employee.emp_id}`,
        username: `${employee.emp_username}`,
        email:  `${employee.emp_email}`,
        phone: `${employee.emp_phone}`,
        gsm: `${employee.emp_gsm_no}`,
        state: `${employee.emp_state}`.replace(/,/g, ''), // remove commas to avoid errors
        nationality: `${employee.emp_nationality}`.replace(/,/g, ''),
        age: `${employee.emp_age}`,
        gender: `${employee.emp_gender}`,
        id_no: `${employee.emp_id_no}`,
        id_type: `${employee.emp_id_type}`.replace(/,/g, ''),
        creation_date: `${creationDate.toString()}`.slice(0, 15),
        religion: `${employee.emp_religion}`.replace(/,/g, ''),
        marital_status: `${employee.emp_religion}`,
        employment_date: `${employmentDate.toString()}`.slice(0, 15),
        date_of_first_employment: `${dateOfFirstEmployment.toString()}`.slice(0, 15),
        confirmation_date: `${confirmationDate.toString()}`.slice(0, 15),
        current_department: `${employee.emp_current_department}`.replace(/,/g, ''),
        present_posting_deployment: `${employee.emp_present_posting_deployment}`.replace(/,/g, ''),
        present_posting_date: `${presentPostingDate.toString()}`.slice(0, 15),
        retirement_date: `${retirementDate.toString()}`.slice(0, 15),
        leaves_left: `${employee.emp_leaves_left}`
      });
    });

    const fileTitle = `employee_Report`; // or 'my-unique-title'
    console.log(`employeeReports: ${employeeReports}, fileTitle: ${fileTitle}`);
    // call the exportCSVFile() function to process the JSON and trigger the download
    this.exportCSVFile(headers, formattedEmployeeReports, fileTitle);
  }
}
