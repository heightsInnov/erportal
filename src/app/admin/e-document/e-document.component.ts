import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-e-document',
  templateUrl: './e-document.component.html',
  styleUrls: ['./e-document.component.css']
})
export class EDocumentComponent implements OnInit {
  filterForm: FormGroup;
  entryForm: FormGroup;
  entries: any[] = [];
  edocumentsUrl = environment.edocumentsUrl;
  employeeUrl = environment.getAllEmployeeUrl;
  getUnitsUrl = environment.getUnitsUrl;
  departments: any[] = [];
  units: any[] = [];
  filterBy = [
    {value: 'search', name: 'Search Entries'},
    {value: 'operation', name: 'Operation Type'},
    {value: 'data', name: 'Data'},
    {value: 'status', name: 'Status'},
    {value: 'custom', name: 'Custom'}
  ];
  edocDataType = [
    {value: 'doc_title', name: 'Document Title'},
    {value: 'ref_no', name: 'Reference No'},
    {value: 'assigned_staff', name: 'Assigned Staff'}
  ];
  filterOption: string;
  dialogRef: MatDialogRef<TemplateRef<any>>;
  employees$: Observable<any[]>;
  entryItems$: Observable<any[]>;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private crudService: CrudService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.initForm(); // initialize reactive form on component init
    this.getEntries();
    this.getUnits(this.getUnitsUrl);
  }

  initForm() {
    this.filterForm = this.fb.group({
      filter_by: [null, Validators.required],
      search: [null],
      status: [null],
      data: [null],
      operation: [null],
    });
    this.entryForm = this.fb.group({
      edoc_doc_name: [null, Validators.required],
      edoc_doc_desc: [null, Validators.required],
      edoc_received_by: [null, Validators.required],
      edoc_receiving_unit: [null, Validators.required],
      // doc_receiving_dept: [null, Validators.required],
      edoc_upload_link: [null, Validators.required],
    });
  }

  get filterFormData() {
    return this.filterForm.controls;
  }

  get entryFormData() {
    return this.entryForm.controls;
  }

  onSubmit(formname, formPayload, extra?) {
    if (formname === 'filterFormData') {
      console.log(formPayload);
      let reqParam = '?';
      for (const item in formPayload) {
        if (item !== 'filter_by' && formPayload[item].value !== null) {
          reqParam += reqParam.endsWith('?') ? `${item}=${formPayload[item].value}` : `&${item}=${formPayload[item].value}`;
        }
      }
      console.log(reqParam);
      this.getEntries(reqParam);
    } else if (formname === 'entryFormData') {
      if (extra === 'register') {
        const payload = {
          edoc_doc_name: this.entryFormData.edoc_doc_name.value,
          edoc_doc_desc: this.entryFormData.edoc_doc_desc.value,
          edoc_received_by: this.entryFormData.edoc_received_by.value,
          edoc_receiving_unit: this.entryFormData.edoc_receiving_unit.value,
          edoc_upload_link: this.entryFormData.edoc_upload_link.value,
        };
        this.registerEntry(payload)
      } else if (extra === 'edit') {
        const payload = {
          edoc_doc_name: this.entryFormData.edoc_doc_name.value,
          edoc_doc_desc: this.entryFormData.edoc_doc_desc.value,
          edoc_received_by: this.entryFormData.edoc_received_by.value,
          edoc_receiving_unit: this.entryFormData.edoc_receiving_unit.value,
          edoc_upload_link: this.entryFormData.edoc_upload_link.value,
        };
        this.editEntry(payload)
      }
    }
  }

  registerEntry(payload) {
    this.spinner.show();
    this.crudService.createData(this.edocumentsUrl.createEntry, payload).subscribe(
      data => {
        console.log(data);
        this.spinner.hide();
      },
      error => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  editEntry(payload) {
    this.spinner.show();
    this.crudService.updateData('', {}).subscribe(
      data => {
        console.log(data);
        this.spinner.hide();
      },
      error => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  assignEntry(id) {
    this.spinner.show();
    this.crudService.updateData('', {}).subscribe(
      data => {
        console.log(data);
        this.spinner.hide();
      },
      error => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  deleteEntry(id) {
    this.spinner.show();
    this.crudService.deleteData('', {}).subscribe(
      data => {
        console.log(data);
        this.spinner.hide();
      },
      error => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  getEntries(query?: string) {
    this.spinner.show();
    let edocumentUrl = '';
    if (query && query !== '' && query !== null) {
      edocumentUrl = `${this.edocumentsUrl}/${query}`;
    } else {
      edocumentUrl = `${this.edocumentsUrl}`;
    }
    console.log(edocumentUrl);
    this.crudService.getData(edocumentUrl).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          let response = [];
          this.spinner.hide();
          this.entries = data.responseObject;
          response = data.responseObject.map(doc => {
            return {name: `${doc.edoc_doc_name}`, id: doc.edoc_doc_ref};
          });
          this.entryItems$ = of(response);
          console.log(this.entryItems$);
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

  openModal(dialog: TemplateRef<any>, options, updateObj?) {
    if (updateObj) {
      this.entryForm.patchValue({
        edoc_doc_name: updateObj.edoc_doc_name,
        edoc_doc_desc: updateObj.edoc_doc_desc,
        edoc_received_by: updateObj.edoc_received_by,
        edoc_receiving_unit: updateObj.edoc_receiving_unit,
        edoc_upload_link: updateObj.edoc_upload_link
      });
    }
    this.dialogRef = this.dialog.open(
      dialog,
      {
        data: options
      }
    );
  }

  submitEntryAction(actionname, id) {
    if (actionname === 'delete') {
      this.deleteEntry(id);
    } else if (actionname === 'assign') {
      this.assignEntry(id);
    }
  }

  entryAction(dialog: TemplateRef<any>, act, actionObj) {
    if (act === 'delete') {
      const modalData = {
        action: act,
        question: `Do you want to ${act} this entry?`,
        id: actionObj.edoc_doc_ref
      };
      this.openModal(dialog, {data: modalData });
    } else if (act === 'assign') {
      const modalData = {
        action: act,
        question: `Do you want to ${act} this entry?`,
        id: actionObj.edoc_doc_ref
      };
      this.openModal(dialog, {data: modalData });
    }
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

  clearForm() {
    this.entryForm.reset();
  }

  close() {
    this.dialogRef.close();
  }
}

// TODO
// filter: search box, register entry
// list of edocuments
// on the table of edocments - action buttons (edit, delete, assign)
// make row clickable(to go to view)
