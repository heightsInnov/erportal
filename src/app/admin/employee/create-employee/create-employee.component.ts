import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { IEducationDataPayload, IEmployeePayload, IFamilyPayload, INextOfKinPayload, IWorkExperiencePayload } from 'src/app/core/models/IEmployee';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';
const countryandstate = require('countrycitystatejson');

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  stepperComponent: MatHorizontalStepper;
  createEmployeeForm: FormGroup;
  addEmployeeExperienceForm: FormGroup;
  addEmployeeEducationDetailsForm: FormGroup;
  addEmployeeNextOfKinDetailsForm: FormGroup;
  addEmployeeFamilyDetailsForm: FormGroup;
  employeeUrl = environment.employeeUrl;
  getDegreesUrl = environment.getDegreesUrl;
  getUnitsUrl = environment.getUnitsUrl;
  designations: any[];
  linearMode = true;
  stepperLabel = {
                    labelOne: 'Create Employee',
                    labelTwo: 'Add Employment Experience',
                    labelThree: 'Add Education Details',
                    labelFour: 'Add Family Details',
                    labelFive: 'Add Next Of Kin'
                  };

  maritalStatuses = [
                      {name: 'Single (SG)', value: 'single'},
                      {name: 'Married (MD)', value: 'married'},
                      {name: 'Widowed (WD)', value: 'widowed'},
                      {name: 'Divorced (DV)', value: 'divorced'},
                      {name: 'Separated (SP)', value: 'separated'}
                    ];
  idTypes = [
              {id: 'Int\'l passport'},
              {id: 'National Identity Number'},
              {id: 'Driver\'s License'},
              {id: 'Voter\'s Number'}
            ];

  roles = ['ADMIN', 'STAFF', 'NON_STAFF'];
  educationCategory = ['Primary', 'Secondary', 'Tetiary'];
  departments: any[];
  listCountries = countryandstate.getCountries();
  selectedCountryCode: string;
  listStates: any[];
  listLGA: any[];
  departmentPositions: any;
  educationDegrees$: Observable<any[]>;
  // adminUser: any;
  currentEmployeeUsername;

  constructor(
                private fb: FormBuilder,
                private router: Router,
                private crudService: CrudService,
                private toastr: ToastrService
              ) {}

  ngOnInit(): void {
    this.initForm(); // initialize reactive form on component init
    this.getUnits(this.getUnitsUrl);
    this.getDegrees();
  }

  get adminUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    return user;
  }

  // build form controls
  initForm(): void {
    this.createEmployeeForm = this.fb.group({
      emp_local_govt_ward: [null, Validators.required],
      emp_id_no: [null, Validators.compose([Validators.required, Validators.minLength(9)])],
      emp_nationality: [null, Validators.required],
      emp_employment_date: [null, Validators.required],
      emp_date_of_first_employment: [null],
      emp_username: [null, Validators.required],
      // emp_gsm_no: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)])],
      emp_gsm_no: [null],
      emp_gender: [null, Validators.required],
      emp_religion: [null],
      emp_firstname: [null, Validators.required],
      emp_state: [null, Validators.required],
      emp_email: [null, Validators.compose([
                                            Validators.required,
                                            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
                                            Validators.email
                                          ])],
      emp_middlename: [null, Validators.required],
      emp_role: [null],
      emp_id_type: [null, Validators.required],
      emp_confirmation_date: [null],
      emp_phone: [null],
      emp_present_posting_deployment: [null],
      emp_address: [null, Validators.required],
      emp_pso_file_no: [null],
      emp_dob: [null, Validators.required],
      emp_commission_file_no: [null],
      emp_professional_affiliaions: [null],
      emp_lastname: [null, Validators.required],
      emp_present_posting_date: [null],
      emp_current_department: [null, Validators.required],
      emp_establisment_file_no: [null],
      emp_place_of_birth: [null],
      emp_marital_status: [null, Validators.required],
      emp_hobbies: [null],
      emp_leave_days: [null, Validators.required]
    });
    this.addEmployeeExperienceForm = this.fb.group({
      experience: this.fb.array([this.addExperience()])
    });
    this.addEmployeeEducationDetailsForm = this.fb.group({
      education: this.fb.array([this.addEducationDetails()])
    });
    this.addEmployeeFamilyDetailsForm = this.fb.group({
      spouse_name: [null, Validators.required],
      children: this.fb.array([this.addFamilyChildrenDetails()])
    });
    this.addEmployeeNextOfKinDetailsForm = this.fb.group({
      nok_address: [null, Validators.required],
      nok_phone: [null, Validators.required],
      nok_name: [null, Validators.required],
      nok_relationship: [null, Validators.required]
    });

  }

  addFamilyChildrenDetails(): FormGroup {
    return this.fb.group({
      child_name: [null, Validators.required],
      child_dob: [null, Validators.required]
    });
  }

  addEducationDetails(): FormGroup {
    return this.fb.group({
      edu_category: [null, Validators.required],
      edu_institution: [null, Validators.required],
      edu_start_date: [null, Validators.required],
      edu_degree: [null, Validators.required],
      edu_cgpa: [null],
      edu_end_date: [null, Validators.required]
    });
  }

  addExperience(): FormGroup {
    return this.fb.group({
      exp_designation: [null, Validators.required],
      exp_responsibility: [null, Validators.required],
      exp_organization: [null, Validators.required],
      exp_end_date: [null, Validators.required],
      exp_start_date: [null, Validators.required]
    });
  }

  populateFormArrayData(formname: string): void {
    if (formname === 'addEmployeeExperienceForm') {
      this.addEmployeeExperienceFormData.push(this.addExperience());
    } else if (formname === 'addEmployeeEducationDetailsForm') {
      this.addEmployeeEducationDetailsFormData.push(this.addEducationDetails());
    } else if (formname === 'addEmployeeFamilyDetailsForm') {
      if (this.addEmployeeFamilyDetailsFormData.children.length <= 8) {
        this.addEmployeeFamilyDetailsFormData.children.push(this.addFamilyChildrenDetails());
      } else {
        this.toastr.warning('Cannot Add Above Eight(8) Children', 'Warning');
      }
    }
  }

  get addEmployeeFamilyDetailsFormData() {
    return {
            spouse_name: this.addEmployeeFamilyDetailsForm.get('spouse_name'),
            children: this.addEmployeeFamilyDetailsForm.get('children') as FormArray
           };
  }

  get addEmployeeNextOfKinDetailsFormData() {
    return this.addEmployeeNextOfKinDetailsForm.controls;
  }

  get addEmployeeEducationDetailsFormData() {
    return this.addEmployeeEducationDetailsForm.get('education') as FormArray;
  }

  get addEmployeeExperienceFormData() {
    return this.addEmployeeExperienceForm.get('experience') as FormArray;
  }

  get createEmployeeFormData() {
    return this.createEmployeeForm.controls;
  }

  onSubmit(formPayload, formname: string, stepperComponent){
    this.stepperComponent = stepperComponent;
    if (formname === 'createEmployeeForm') {
      console.log(formPayload);
      this.currentEmployeeUsername = formPayload.emp_username.value;
      const payload: IEmployeePayload = {
        emp_local_govt_ward: formPayload.emp_local_govt_ward.value,
        emp_id_no: formPayload.emp_id_no.value,
        emp_nationality: formPayload.emp_nationality.value.name,
        emp_employment_date: formPayload.emp_employment_date.value,
        emp_date_of_first_employment: formPayload.emp_date_of_first_employment.value,
        emp_username: formPayload.emp_username.value,
        emp_gsm_no: formPayload.emp_gsm_no.value,
        emp_gender: formPayload.emp_gender.value,
        emp_religion: formPayload.emp_religion.value,
        emp_firstname: formPayload.emp_firstname.value,
        emp_state: formPayload.emp_state.value,
        emp_email: formPayload.emp_email.value,
        emp_middlename: formPayload.emp_middlename.value,
        emp_role: formPayload.emp_role.value,
        emp_id_type: formPayload.emp_id_type.value,
        emp_confirmation_date: formPayload.emp_confirmation_date.value,
        emp_phone: formPayload.emp_phone.value,
        emp_present_posting_deployment: formPayload.emp_present_posting_deployment.value || null,
        emp_address: formPayload.emp_address.value,
        emp_pso_file_no: formPayload.emp_pso_file_no.value,
        emp_dob: formPayload.emp_dob.value,
        emp_commission_file_no: formPayload.emp_commission_file_no.value,
        emp_professional_affiliaions: formPayload.emp_professional_affiliaions.value,
        emp_lastname: formPayload.emp_lastname.value,
        emp_present_posting_date: formPayload.emp_present_posting_date.value,
        emp_current_department: formPayload.emp_current_department.value.name,
        emp_establisment_file_no: formPayload.emp_establisment_file_no.value,
        emp_place_of_birth: formPayload.emp_place_of_birth.value,
        emp_marital_status: formPayload.emp_marital_status.value,
        emp_hobbies: formPayload.emp_hobbies.value,
        emp_leave_days: formPayload.emp_leave_days.value,
      };
      console.log(payload);
      this.createEmployee(`${this.employeeUrl.createStaff}/${this.adminUser.emp_username}`, payload);
    } else if (formname === 'addEmployeeExperienceForm') {
      console.log(formPayload);
      const payload = {
        experience: formPayload.value
      };
      console.log(payload);
      this.addEmployeeExperience(`${this.employeeUrl.createExperience}/${this.currentEmployeeUsername}`, payload);
    } else if (formname === 'addEmployeeEducationDetailsForm') {
      console.log(formPayload);
      const payload = {
        education: formPayload.value
      };
      console.log(payload);
      this.addEmployeeEducationDetails(`${this.employeeUrl.createEducation}/${this.currentEmployeeUsername}`, payload);
    } else if (formname === 'addEmployeeNextOfKinDetailsForm') {
      console.log(formPayload);
      const payload: INextOfKinPayload = {
        nok_address: formPayload.nok_address.value,
        nok_phone: formPayload.nok_phone.value,
        nok_name: formPayload.nok_name.value,
        nok_relationship: formPayload.nok_relationship.value
      };
      console.log(payload);
      this.addEmployeeNextOfKinDetails(`${this.employeeUrl.createNextOfKin}/${this.currentEmployeeUsername}`, payload);
    } else if (formname === 'addEmployeeFamilyDetailsForm') {
      console.log(formPayload);
      const payload = {
        spouse_name: formPayload.spouse_name.value,
        children: formPayload.children.value
      };
      this.addEmployeeFamilyDetails(`${this.employeeUrl.createFamily}/${this.currentEmployeeUsername}`, payload);
    }
  }

  deleteEntry(idx: number, formname: string) {
    if (formname === 'addEmployeeExperienceForm') {
      this.addEmployeeExperienceFormData.removeAt(idx);
    } else if (formname === 'addEmployeeEducationDetailsForm') {
      this.addEmployeeEducationDetailsFormData.removeAt(idx);
    } else if (formname === 'addEmployeeFamilyDetailsForm') {
      this.addEmployeeFamilyDetailsFormData.children.removeAt(idx);
    }
  }

  createEmployee(url: string, payload: IEmployeePayload) {
    this.crudService.createData(url, payload).subscribe(
      data => {
        console.log(data);
        this.toastr.info('Employee Created!', 'Successful');
        this.linearMode = false;
        this.stepperComponent.next();
      },
      error => {
        console.log(error);
      }
    );
  }

  addEmployeeExperience(url: string, payload) {
    this.crudService.createData(url, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode)
        this.toastr.info('Employee Experience Added!', 'Successful');
        this.stepperComponent.next();
      },
      error => {
        console.log(error);
      }
    );
  }

  addEmployeeEducationDetails(url: string, payload) {
    this.crudService.createData(url, payload).subscribe(
      data => {
        console.log(data);
        this.toastr.info('Employee Education Details Added!', 'Successful');
        this.stepperComponent.next();
      },
      error => {
        console.log(error);
      }
    );
  }

  addEmployeeNextOfKinDetails(url: string, payload: INextOfKinPayload) {
    this.crudService.createData(url, payload).subscribe(
      data => {
        console.log(data);
        this.toastr.info('Employee Next of Kin Details added!', 'Successful');
        this.stepperComponent.reset();
        this.goToEmployee();
      },
      error => {
        console.log(error);
      }
    );
  }

  addEmployeeFamilyDetails(url: string, payload: IFamilyPayload) {
    this.crudService.createData(url, payload).subscribe(
      data => {
        console.log(data);
        this.toastr.info('Employee Family Details added!', 'Successful');
        this.stepperComponent.next();
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
          this.departments = data.responseObject.unit;
          this.departmentPositions = data.responseObject.designations;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getState() {
    this.selectedCountryCode = this.createEmployeeFormData.emp_nationality.value.shortName;
    console.log(this.selectedCountryCode);
    this.listStates = countryandstate.getStatesByShort(this.selectedCountryCode);
    console.log(this.listStates);
  }

  getLGA() {
    const state = this.createEmployeeFormData.emp_state.value;
    this.listLGA = countryandstate.getCities(this.selectedCountryCode, state);
    console.log(this.listLGA);
  }

  getDesignationBasedOnDepartment() {
    const department = this.createEmployeeFormData.emp_current_department.value.code;
    this.designations = this.departmentPositions.filter(position => { if (department === position.unit_code) {
                                                                        return position;
                                                                      }
                                                                    });
  }

  getDegrees() {
    this.crudService.getData(this.getDegreesUrl).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.educationDegrees$ = of(data.responseObject);
        } else if (data.responseCode === '99') {
          this.toastr.warning('Cannot load education degrees', 'Error');
        }
      },
      error => {
        console.log(error);
        this.toastr.warning('Cannot load education degrees', 'Error');
      }
    );
  }

  goToEmployee() {
    this.router.navigate(['/admin/employee']);
  }
}
