import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-unit-designations',
  templateUrl: './unit-designations.component.html',
  styleUrls: ['./unit-designations.component.css']
})
export class UnitDesignationsComponent implements OnInit {

  unitForm: FormGroup;
  designationForm: FormGroup;

  unitUrl = environment.setupUrl.units;
  getUnitsUrl = environment.getUnitsUrl;
  designationUrl = environment.setupUrl.designations;

  dialogRef: MatDialogRef<TemplateRef<any>>;
  actionLoading: boolean;
  units: any[] = [];
  designations: any[] = [];

  constructor(
    private crudService: CrudService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getUnitAndDesignation();
  }

  getUnitAndDesignation() {
    this.crudService.getData(this.getUnitsUrl).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.units = data.responseObject.unit;
          this.designations = data.responseObject.designations;
        } else if (data.responseObject === '99') {
          // console.log('error: ', error);
          this.toastr.error('Failed to fetch setup resource', 'ERROR');
        }
      },
      error => {
        console.log('error: ', error);
        this.toastr.error('Failed to fetch setup resource', 'ERROR');
      }
    );
  }

  initForm() {
    this.unitForm = this.fb.group({
      unit_name: [null, Validators.required]
    });

    this.designationForm = this.fb.group({
      desig_name: [null, Validators.required]
    });
  }

  get unitFormData() {
    return this.unitForm.controls;
  }

  get designationFormData() {
    return this.designationForm.controls;
  }

  onSubmit(formPayload: { [key: string]: AbstractControl }, formname: string) {
    if (formname === 'unitForm') {
      const payload = {
        unit_name: formPayload.unit_name.value
      };
      this.createUnit(payload);
    } else if (formname === 'designationForm') {
      const payload = {
        desig_name: formPayload.desig_name.value
      };
      this.createDesignation(payload);
    }
  }

  createUnit(payload){
    this.actionLoading = true;
    const createUnitUrl = `${this.unitUrl}?action=C`;
    this.crudService.createData(createUnitUrl, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.actionLoading = false;
          this.clearForm(this.unitForm);
          this.close();
          this.toastr.success('Unit Created', 'SUCCESSFUL');
          this.getUnitAndDesignation();
        } else if (data.responseCode === '99') {
          this.actionLoading = false;
          this.toastr.error('Sorry, failed to create unit')
        }
      },
      error => {
        console.log('error: ', error);
        this.actionLoading = false;
        this.toastr.error('Sorry, failed to create unit')
      }
    )
  }


  deleteUnit(payload) {
    this.actionLoading = true;
    const deleteUnitUrl = `${this.unitUrl}?action=D`;
    this.crudService.deleteData(deleteUnitUrl, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.actionLoading = false;
          this.close();
          this.toastr.success('Unit Deleted')
          this.getUnitAndDesignation();
        } else if (data.responseCode === '99') {
          this.actionLoading = false;
          this.toastr.error('Sorry, failed to delete unit')
        }
      },
      error => {
        console.log('error: ', error);
        this.actionLoading = false;
        this.toastr.error('Sorry, failed to delete unit')
      }
    )
  }

  createDesignation(payload) {
    this.actionLoading = true;
    const createDesignationUrl = `${this.designationUrl}?action=C`;
    this.crudService.createData(createDesignationUrl, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.actionLoading = false;
          this.clearForm(this.designationForm);
          this.close();
          this.toastr.success('Designation Created', 'SUCCESSFUL');
          this.getUnitAndDesignation();
        } else if (data.responseCode === '99') {
          this.actionLoading = false;
          this.toastr.error('Sorry, failed to create designation')
        }
      },
      error => {
        console.log('error: ', error);
        this.actionLoading = false;
        this.toastr.error('Sorry, failed to create designation')
      }
    )
  }

  deleteDesignation(payload) {
    this.actionLoading = true;
    const deleteDesignationtUrl = `${this.designationUrl}?action=D`;
    this.crudService.deleteData(deleteDesignationtUrl, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.actionLoading = false;
          this.close();
          this.toastr.success('Designation Deleted')
          this.getUnitAndDesignation();
        } else if (data.responseCode === '99') {
          this.actionLoading = false;
          this.toastr.error('Sorry, failed to delete Designation')
        }
      },
      error => {
        console.log('error: ', error);
        this.actionLoading = false;
        this.toastr.error('Sorry, failed to delete Designation')
      }
    )
  }

  openModal(dialog: TemplateRef<any>, options) {
    console.log(options);
    // if (options.action === 'unit') {
    //   options.formDetails = {form: this.unitForm, formData: this.unitFormData};
    // } else if (options.action === 'designation') {
    //   options.formDetails = { form: this.designationForm, formData: this.designationFormData };
    // }
    console.log(options);
    this.dialogRef = this.dialog.open(
      dialog,
      {
        data: options
      }
    );
  }

  submitModal(modalData) {
    console.log(modalData);
    if(modalData.action === 'unit') {
      const payload = {
        unit_code: modalData.extraData.code
      }
      this.deleteUnit(payload);

    } else if (modalData.action === 'designation') {
      const payload = {
        desig_code: modalData.extraData.code
      }
      this.deleteDesignation(payload);
    }
  }

  clearForm(form: FormGroup) {
    form.reset();
  }

  close() {
    this.dialogRef.close();
  }

}
