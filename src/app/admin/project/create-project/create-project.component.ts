import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { IBusinessContacts, IHandoverNote, IDocumentRegister, IHandoverActivites, IToolsAndEquipment, IVehicleMaintenace } from 'src/app/core/models/IHandover';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  stepperComponent: MatHorizontalStepper;
  createHandoverNoteUrl = environment.createHandoverNoteUrl;
  getHandoverNoteUrl = environment.getHandoverNotesUrl;
  getEmployeesUrl = environment.getAllEmployeeUrl;
  userDetails = JSON.parse(localStorage.getItem('user'));
  handoverCategories: any[] = [];
  handoverForm: FormGroup;
  activitiesProjectsProposalForm: FormGroup;
  toolsAndEquipmentsForm: FormGroup;
  documentRegisterForm: FormGroup;
  booksCdsSoftwaresForm: FormGroup;
  vehicleMaintenanceForm: FormGroup;
  activitiesProjectsProposalTable: any[] = [];
  handoverReasons = ['Annual Leave', 'Final Exit', 'Reassignment'];
  // activitiesCategory: any[] = [];
  businessContactsCategory: any;
  booksCdsSoftwaresCategory: any;
  documentRegisterCategory: any;
  businessContactsTable: any[] = [];
  toolsAndEquipmentsTable: any[] = [];
  booksCdsSoftwaresTable: any[] = [];
  vehicleMaintenanceTable: any[] = [];
  statuses: any[] = [
    {
      code: 'P',
      name: 'Pending'
    },
    {
      code: 'O',
      name: 'Ongoing'
    },
    {
      code: 'C',
      name: 'Completed'
    }
  ];
  getActivityStatusUrl = environment.getActivityStatusURL;
  stepperLabel = {
    labelOne: 'Handover Note',
    labelTwo: 'Add Activities',
    labelThree: 'Documents Register',
    labelFour: 'Business Contacts',
    labelFive: 'Tools and Equipment',
    labelSix: 'Books, CDs, ETC',
    labelSeven: 'Vehicle Maintenance'
  };
  businessContactsForm: FormGroup;
  documentRegisterTable: any[] = [];
  itemType: any[] = [];
  handoverId: any;
  employees$: Observable<any[]>;
  linearMode = true;
  modal: MatDialogRef<TemplateRef<any>>;

  constructor(
              private fb: FormBuilder,
              private router: Router,
              private crudService: CrudService,
              private toastr: ToastrService,
              private dialog: MatDialog
              ) { }

  ngOnInit(): void {
    this.initForm(); // initialize reactive form on component init
    // this.getStatus();
    this.getHandoverCategories();
    this.getEmployees();
    console.log(this.userDetails);
    this.setEmpNamePhone();
  }

  getEmployees() {
    this.crudService.getData(this.getEmployeesUrl).subscribe(
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

  setEmpNamePhone() {
    this.handoverForm.patchValue({
      handoverStaff: this.userDetails.emp_firstname !== null ? `${this.userDetails.emp_firstname} ${this.userDetails.emp_lastname}` : '',
      phonenumber: this.userDetails.emp_phone !== null ? `${this.userDetails.emp_phone}` : '',
      address: this.userDetails.emp_address !== null ? `${this.userDetails.emp_address}` : ''
    });
  }

  initForm() {
    this.handoverForm = this.fb.group({
      handoverStaff: [null, Validators.required],
      address: [null, Validators.required],
      phonenumber: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)])],
      handoverDate: [null, Validators.required],
      handoverReason: [null, Validators.required],
      handoverWitness: [null, Validators.required],
      takeoverStaff: [null, Validators.required]
    });
    this.activitiesProjectsProposalForm = this.fb.group({
      subject: [null, Validators.required],
      status: [null, Validators.required],
      actionRequired: [null, Validators.required],
      actionTaker: [null, Validators.required],
      expectedOutcome: [null, Validators.required],
      completionDate: [null, Validators.required]
    });
    this.documentRegisterForm = this.fb.group({
      category: [null, Validators.required],
      documentRefNo: [null, Validators.required],
      documentTitle: [null, Validators.required],
      dateCreated: [null, Validators.required],
      fileDirectory: [null, Validators.required],
      locationOfHardCopy: [null, Validators.required],
      documentOwner: [null, Validators.required]
    });
    this.businessContactsForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      company: [null, Validators.required],
      designation: [null, Validators.required],
      officeAddress: [null, Validators.required],
      email: [null, Validators.compose([
                                        Validators.required,
                                        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
                                        Validators.email
                                      ])],
      phonenumber: [null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]]
    });
    this.toolsAndEquipmentsForm = this.fb.group({
      item: [null, Validators.required],
      type: [null, Validators.required],
      noOfUnits: [null, Validators.required],
      currentCondition: [null, Validators.required],
      currentLocation: [null, Validators.required]
    });
    this.booksCdsSoftwaresForm = this.fb.group({
      category: [null, Validators.required],
      title: [null, Validators.required],
      fileName: [null, Validators.required],
      locationOfHardcopy: [null, Validators.required],
      weblink: [null, Validators.required],
      userId: [null, Validators.required],
      password: [null, Validators.required]
    });
    this.vehicleMaintenanceForm = this.fb.group({
      driverName: [null, Validators.required],
      vehicleType: [null, Validators.required],
      vehicleNo: [null, Validators.required],
      vehicleStatus: [null, Validators.required],
    });
  }

  get vehicleMaintenanceFormData() {
    return this.vehicleMaintenanceForm.controls;
  }

  get booksCdsSoftwaresFormData() {
    return this.booksCdsSoftwaresForm.controls;
  }

  get toolsAndEquipmentsFormData() {
    return this.toolsAndEquipmentsForm.controls;
  }

  get businessContactsFormData() {
    return this.businessContactsForm.controls;
  }

  get documentRegisterFormData() {
    return this.documentRegisterForm.controls;
  }

  get activitiesProjectsProposalFormData() {
    return this.activitiesProjectsProposalForm.controls;
  }

  get handoverFormData(){
    return this.handoverForm.controls;
  }

  onSubmit(formPayload, formname, stepperComponent?) {
    this.stepperComponent = stepperComponent;
    console.log(formPayload);
    if (formname === 'handoverForm') {
      const payload: IHandoverNote = {
        resignee_name: formPayload.handoverStaff.value,
        resignee_address: formPayload.address.value,
        resignee_phone: formPayload.phonenumber.value,
        handover_effective_date: formPayload.handoverDate.value,
        handover_reason: formPayload.handoverReason.value,
        handover_witness: formPayload.handoverWitness.value,
        takeover_name: formPayload.takeoverStaff.value,
       };
      console.log(payload);
      this.createHandoverNote(`${this.createHandoverNoteUrl.createHandoverNote}/${this.userDetails.emp_username}`, payload);

    } else if (formname === 'activitiesProjectsProposalForm') {
      const payload = this.activitiesProjectsProposalTable;
      console.log(payload);
      this.addHandoverActivities(`${this.createHandoverNoteUrl.addActivities}/${this.handoverId}`, payload);
    } else if (formname === 'documentRegisterForm') {
      const payload = this.documentRegisterTable;
      console.log(payload);
      this.addHandoverDocumentRegister(`${this.createHandoverNoteUrl.addDocumentRegister}/${this.handoverId}`, payload);
    } else if (formname === 'businessContactsForm') {
      const payload = this.businessContactsTable;
      console.log(payload);
      this.addHandoverBusinessContacts(`${this.createHandoverNoteUrl.addBusinessContact}/${this.handoverId}`, payload);
    } else if (formname === 'toolsAndEquipmentsForm') {
      const payload = this.toolsAndEquipmentsTable;
      console.log(payload);
      this.addHandoverToolsAndEquipment(`${this.createHandoverNoteUrl.addToolsandEquipment}/${this.handoverId}`, payload);
    } else if (formname === 'booksCdsSoftwaresForm') {
      const payload = this.booksCdsSoftwaresTable;
      console.log(payload);
      this.addHandoverBooksCdsSoftwares(`${this.createHandoverNoteUrl.addBooksCdsSoftwares}/${this.handoverId}`, payload);
    } else if (formname === 'vehicleMaintenanceForm') {
      const payload = this.vehicleMaintenanceTable;
      console.log(payload);
      this.addHandoverVehicleMaintenance(`${this.createHandoverNoteUrl.addVehicleMaintenance}/${this.handoverId}`, payload);
    }
  }

  createHandoverNote(url: string, payload: IHandoverNote) {
    this.crudService.createData(url, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.toastr.success(`${data.responseMessage}`);
          this.handoverId = data.responseObject.handover_id;
          this.linearMode = false;
          this.stepperComponent.next();
        } else {
          this.toastr.error(`${data.responseMessage}`);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  addHandoverActivities(url: string, payload) {
    this.crudService.createData(url, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.close();
          this.toastr.success(`${data.responseMessage}`);
          this.stepperComponent.next();
        }
      },
      error =>{
        console.log(error);
      }
    );
  }

  addHandoverBusinessContacts(url: string, payload) {
    this.crudService.createData(url, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.close();
          this.toastr.success(`${data.responseMessage}`);
          this.stepperComponent.next();
        }
      },
      error =>{
        console.log(error);
      }
    );
  }

  addHandoverDocumentRegister(url: string, payload) {
    this.crudService.createData(url, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.close();
          this.toastr.success(`${data.responseMessage}`);
          this.stepperComponent.next();
        }
      },
      error =>{
        console.log(error);
      }
    );
  }

  addHandoverBooksCdsSoftwares(url: string, payload) {
    this.crudService.createData(url, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.close();
          this.toastr.success(`${data.responseMessage}`);
          this.stepperComponent.next();
        }
      },
      error =>{
        console.log(error);
      }
    );
  }

  addHandoverToolsAndEquipment(url: string, payload) {
    this.crudService.createData(url, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.close();
          this.toastr.success(`${data.responseMessage}`);
          this.stepperComponent.next();
        }
      },
      error =>{
        console.log(error);
      }
    );
  }

  addHandoverVehicleMaintenance(url: string, payload) {
    this.crudService.createData(url, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.close();
          this.toastr.success(`${data.responseMessage}`);
          this.stepperComponent.reset();
          this.gotoHandover();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  populateActivitiesProjectsProposalTable(formpayload) {
    console.log(formpayload);
    const tableData: IHandoverActivites = {
      subject: formpayload.subject.value,
      status: formpayload.status.value,
      followup_req: formpayload.actionRequired.value,
      followup_staff_id: formpayload.actionTaker.value,
      expected_outcome: formpayload.expectedOutcome.value,
      expected_comp_date: formpayload.completionDate.value
    };
    console.log(tableData);
    this.activitiesProjectsProposalTable.push(tableData);
    console.log(this.activitiesProjectsProposalTable);
    this.toastr.info(`${tableData.subject} added!`);
    this.activitiesProjectsProposalForm.reset();
  }

  populateDocumentRegistersTable(formpayload) {
    console.log(formpayload);
    const tableData: IDocumentRegister = {
      sub_category: formpayload.category.value,
      reference_number: formpayload.documentRefNo.value,
      title: formpayload.documentTitle.value,
      date_created: formpayload.dateCreated.value,
      file_directory_name: formpayload.fileDirectory.value,
      file_hard_copy_loc: formpayload.locationOfHardCopy.value,
      document_owner: formpayload.documentOwner.value
    };
    this.documentRegisterTable.push(tableData);
    this.toastr.info(`${tableData.title} added!`);
    this.documentRegisterForm.reset();
    console.log(tableData);
  }

  populatebusinessContacts(formpayload) {
    console.log(formpayload);
    const tableData: IBusinessContacts = {
      subcat: formpayload.category.value,
      name: formpayload.name.value,
      company_or_department: formpayload.company.value,
      designation: formpayload.designation.value,
      office_address: formpayload.officeAddress.value,
      contact_phone: formpayload.phonenumber.value,
      contact_email: formpayload.email.value
    };
    this.businessContactsTable.push(tableData);
    this.toastr.info(`${tableData.name} Contact Added`);
    this.businessContactsForm.reset();
  }

  populatetoolsAndEquipments(formpayload) {
    console.log(formpayload);
    const tableData: IToolsAndEquipment = {
      item: formpayload.item.value,
      type: formpayload.type.value,
      no_of_units: formpayload.noOfUnits.value,
      condition: formpayload.currentCondition.value,
      location: formpayload.currentLocation.value
    };
    this.toolsAndEquipmentsTable.push(tableData);
    this.toastr.info(`${tableData.item} Added`);
    this.toolsAndEquipmentsForm.reset();
  }

  populateBooksCdsSoftwares(formpayload) {
    console.log(formpayload);
    const tableData = {
      subcat: formpayload.category.value,
      title: formpayload.title.value,
      file_path: formpayload.fileName.value,
      hard_copy_loc: formpayload.locationOfHardcopy.value,
      website_weblink: formpayload.weblink.value,
      user_id: formpayload.userId.value,
      password: formpayload.password.value
    };
    this.booksCdsSoftwaresTable.push(tableData);
    this.toastr.info(`${tableData.title} Added`);
    this.booksCdsSoftwaresForm.reset();
  }

  populateVehicleMaintenace(formpayload) {
    console.log(formpayload);
    const tableData: IVehicleMaintenace = {
      driver_name: formpayload.driverName.value,
      vehicle_number: formpayload.vehicleNo.value,
      vehicle_type: formpayload.vehicleType.value,
      status: formpayload.vehicleStatus.value,
    };
    this.vehicleMaintenanceTable.push(tableData);
    this.toastr.info(`${tableData.vehicle_type} with Vehicle Number: ${tableData.vehicle_number} Added`);
    this.vehicleMaintenanceForm.reset();
  }

  deleteTableData(idx, tablename) {
    if (tablename === 'activitiesProjectsProposalTable') {
      this.activitiesProjectsProposalTable.splice(idx, 1);
      this.toastr.info('Removed');
    } else if (tablename === 'documentRegisterTable') {
      this.documentRegisterTable.splice(idx, 1);
      this.toastr.info('Removed');
    } else if (tablename === 'businessContactsTable') {
      this.businessContactsTable.splice(idx, 1);
      this.toastr.info('Removed');
    } else if (tablename === 'toolsAndEquipmentsTable') {
      this.toolsAndEquipmentsTable.splice(idx, 1);
      this.toastr.info('Removed');
    } else if (tablename === 'booksCdsSoftwaresTable') {
      this.booksCdsSoftwaresTable.splice(idx, 1);
      this.toastr.info('Removed');
    } else if (tablename === 'vehicleMaintenanceTable') {
      this.vehicleMaintenanceTable.splice(idx, 1);
      this.toastr.info('Removed');
    }
  }

  getStatus(url: string) {
    this.crudService.getData(url).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00'){
          this.statuses = data.responseObject;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getHandoverCategories() {
    this.crudService.getData(this.createHandoverNoteUrl.getHandoverCategories).subscribe(
      data => {
        if (data.responseCode === '00') {
          this.handoverCategories = data.responseObject;
          data.responseObject.foreach(obj => {
            if (obj.cat_name === 'DIRECTORY OF BUSINESS CONTACTS') {
              this.businessContactsCategory = obj;
            } else if (obj.cat_name === 'BOOKS, CDS, SOFTWARES AND REFERENCE MANUALS') {
              this.booksCdsSoftwaresCategory = obj;
            } else if (obj.cat_name === 'DOCUMENT REGISTER') {
              this.documentRegisterCategory = obj;
            }
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  // getHandoverId() {
  //   this.crudService.getData(`${this.getHandoverNoteUrl}/${this.userDetails.staff_id}`).subscribe(
  //     data => {
  //       if (data.responseCode === '00') {
  //         this.handoverId = data.responseObject.handover_id;
  //       }
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }


  openModal(dialog: TemplateRef<any>){
    this.modal = this.dialog.open(dialog);
  }

  clearForm(form: FormGroup) {
    form.reset();
  }

  gotoHandover() {
    this.router.navigate(['admin/handover']);
  }

  close() {
    this.modal.close();
  }
}
