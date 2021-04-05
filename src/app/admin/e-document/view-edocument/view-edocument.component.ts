import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { IEditAssignmentPayload, INewAssignmentPayload } from 'src/app/core/models/IEdocument';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-edocument',
  templateUrl: './view-edocument.component.html',
  styleUrls: ['./view-edocument.component.css']
})
export class ViewEdocumentComponent implements OnInit {

  editAssignmentForm: FormGroup;
  newAssignmentForm: FormGroup;
  edocRefNo: string;
  edocumentsUrl = environment.edocumentsUrl;
  employeeUrl = environment.getAllEmployeeUrl;
  getUnitsUrl = environment.getUnitsUrl;
  edocEntry: any;
  edocEntryAssignments: any[] = [];
  dialogRef: MatDialogRef<TemplateRef<any>>;
  units: any[] = [];
  employees$: Observable<any[]>;
  userData = JSON.parse(localStorage.getItem('user'));
  emps: any[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private crudService: CrudService,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getDocumentId();
    this.initForm(); // initialize reactive form on component init
    this.getUnits(this.getUnitsUrl);
    this.getEmployees();
  }

  getDocumentId() {
    this.route.queryParamMap.subscribe(
      (params: ParamMap) => {
        if (params.get('id') !== undefined) {
          this.edocRefNo = params.get('id');

          this.getEntryDetails(this.edocRefNo);
          this.getEntryAssignment(this.edocRefNo);
        }
        console.log('edoc_ref: ', this.edocRefNo);
      }
    );
  }

  log(id) {
    console.log(id);
  }

  initForm() {
    this.newAssignmentForm = this.fb.group({
      edas_edoc_ref: [{value: null, readonly: true}, Validators.required],
      edas_present_unit: [{value: null, disabled: true}, Validators.required],
      edas_assign_to_unit: [null, Validators.required],
      edas_comment: [null, Validators.required],
      edas_assigned_to: [null, Validators.required],
      edas_assigned_by: [null, Validators.required],
      edas_file: [null],
      edoc_image_byte: [null],
    });
    this.editAssignmentForm = this.fb.group({
      edas_id: [null],
      edas_edoc_ref: [{value: null, readonly: true}, Validators.required],
      edas_comment: [null, Validators.required],
      edas_present_unit: [null, Validators.required],
      edas_assigned_to: [null, Validators.required],
      edas_assigned_by: [{value: null, readonly: true}, Validators.required],
    });
  }

  get newAssignmentFormData() {
    return this.newAssignmentForm.controls;
  }

  get editAssignmentFormData() {
    return this.editAssignmentForm.controls;
  }

  onSubmit(formname, formPayload) {
    if (formname === 'newAssignmentForm') {
      const payload: INewAssignmentPayload = {
        edas_edoc_ref: formPayload.edas_edoc_ref.value,
        edas_present_unit: formPayload.edas_assign_to_unit.value,
        edas_comment: formPayload.edas_comment.value,
        edas_assigned_to: formPayload.edas_assigned_to.value,
        edas_assigned_by: formPayload.edas_assigned_by.value
      };
      this.newAssignment(payload);
    } else if (formname === 'editAssignmentForm') {
      const payload: IEditAssignmentPayload = {
        edas_id: formPayload.edas_id.value,
        edas_present_unit: formPayload.edas_present_unit.value,
        edas_comment: formPayload.edas_comment.value,
        edas_assigned_to: formPayload.edas_assigned_to.value
      };
      console.log(payload);
      this.editAssignment(payload);
    }
  }

  getEntryDetails(id: string) {
    this.crudService.getData(`${this.edocumentsUrl.getEntry}?operation=ED&data=${id}`).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.edocEntry = data.responseObject[0];
        }
      },
      error => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  getEntryAssignment(id: string) {
    this.crudService.getData(`${this.edocumentsUrl.getEntry}?operation=EA&data=${id}`).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.edocEntryAssignments = data.responseObject;
        }
      },
      error => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  newAssignment(payload: INewAssignmentPayload) {
    this.crudService.createData(this.edocumentsUrl.assignEntry, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.toastr.success('Entry Assigned');
          this.getDocumentId();
          this.dialogRef.close();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  editAssignment(payload: IEditAssignmentPayload) {
    this.crudService.updateData(`${this.edocumentsUrl.editAssignment}`, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.toastr.success('Assignment Edited');
          this.getDocumentId();
          this.dialogRef.close();
        }
      },
      error => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  deleteAssignment(id) {
    this.crudService.deleteData(`${this.edocumentsUrl.deleteEntry}/EA/${id}`, '').subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.toastr.success('Entry Deleted', 'SUCCESSFUL');
          this.getDocumentId();
          this.dialogRef.close();
        }
      },
      error => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  takeAction(dialog: TemplateRef<any>, act, actionObj) {
    if (act === 'assign' || act === 'edit') {
      const presentUnit = this.units.filter(unit => unit.name === actionObj.edas_present_unit);
      console.log('presentUnit: ', presentUnit);
      console.log('emps: ', this.emps);
      const assignedTo =
      this.emps.filter(emp => `${emp.emp_firstname} ${emp.emp_lastname}`.toLowerCase() === `${actionObj.edas_assigned_to}`.toLowerCase());
      console.log('assignedTo: ', assignedTo);
      if (act === 'assign') {
        this.newAssignmentForm.patchValue({
          edas_edoc_ref: actionObj.edas_edoc_ref,
          edas_present_unit: presentUnit[0].code || null,
          edas_assigned_by: this.userData.emp_id,
        });
        this.openModal(dialog, act);
      } else if (act === 'edit') {
        this.editAssignmentForm.patchValue({
          edas_id: actionObj.edas_id,
          edas_edoc_ref: actionObj.edas_edoc_ref,
          edas_present_unit: presentUnit[0].code || null,
          edas_assigned_by: actionObj.edas_assigned_by,
          edas_assigned_to: assignedTo[0].emp_id || null,
          edas_comment: actionObj.edas_comment
        });
        this.openModal(dialog, act);
      }
    } else if (act === 'close') {
      const modalData = {
        action: act,
        question: `Do you want to ${act} this entry?`,
        id: actionObj.edas_id
      };
      this.openModal(dialog, modalData);
    }
  }

  openModal(dialog: TemplateRef<any>, options) {
    this.dialogRef = this.dialog.open(
      dialog,
      {
        data: options
      }
    );
  }

  getEmployees() {
    this.crudService.getData(this.employeeUrl).subscribe(
      data => {
        console.log(data);
        let response = [];
        if (data.responseCode === '00') {
          this.emps = data.responseObject;
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

  getUnits(url: string) {
    this.crudService.getData(url).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00'){
          this.units = data.responseObject.unit;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  clearForm(form: FormGroup) {
    form.reset();
  }

  close() {
    this.dialogRef.close();
  }

}
