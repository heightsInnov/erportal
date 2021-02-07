import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IEditEntryPayload, IRegisterEntryPayload } from 'src/app/core/models/IEdocument';
import { Router } from '@angular/router';

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
  emps: any[] = [];
  entryItems$: Observable<any[]>;
  edocId: number;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private crudService: CrudService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.initForm(); // initialize reactive form on component init
    this.getEntries();
    this.getUnits(this.getUnitsUrl);
    this.getEmployees();
  }

  initForm() {
    this.filterForm = this.fb.group({
      filter_by: [null, Validators.required],
      search: [null],
      status: [null],
      data: [null],
    });
    this.entryForm = this.fb.group({
      edoc_doc_name: [null, Validators.required],
      edoc_doc_desc: [null, Validators.required],
      edoc_received_by: [null, Validators.required],
      edoc_receiving_unit: [null, Validators.required],
      // edoc_receiving_dept: [null, Validators.required],
      edoc_doc_title: [null, Validators.required],
      edoc_date_received: [null, Validators.required],
      edoc_file: [null, Validators.required],
      edoc_image_byte: [null, Validators.required],
      edoc_doc_ref: [null, Validators.required]
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
      let reqParam = '';
      for (const item in formPayload) {
        if (item !== 'filter_by' && formPayload[item].value !== null) {
          reqParam += `&${item}=${formPayload[item].value}`;
        }
      }
      console.log(reqParam);
      this.getEntries(reqParam);
    } else if (formname === 'entryFormData') {
      if (extra === 'register') {
        const payload: IRegisterEntryPayload = {
          edoc_doc_ref: formPayload.edoc_doc_ref.value,
          edoc_doc_name: formPayload.edoc_doc_name.value,
          edoc_received_by: +formPayload.edoc_received_by.value,
          file_name: formPayload.edoc_image_byte.value.file_name,
          image_byte: formPayload.edoc_image_byte.value.image_byte,
          edoc_date_received: formPayload.edoc_date_received.value,
          edoc_doc_desc: formPayload.edoc_doc_desc.value,
          edoc_doc_title: formPayload.edoc_doc_title.value,
          edoc_receiving_dept: '',
          edoc_receiving_unit: formPayload.edoc_receiving_unit.value,
        };
        console.log(payload);
        this.registerEntry(payload);
      } else if (extra === 'edit') {
        const payload: IEditEntryPayload = {
          edoc_id: +this.edocId,
          edoc_doc_ref: formPayload.edoc_doc_ref.value,
          edoc_doc_name: formPayload.edoc_doc_name.value,
          edoc_received_by: +formPayload.edoc_received_by.value,
          edoc_date_received: new Date(formPayload.edoc_date_received.value).toLocaleDateString(),
          edoc_doc_desc: formPayload.edoc_doc_desc.value,
          edoc_doc_title: formPayload.edoc_doc_title.value,
          edoc_receiving_dept: '',
          edoc_receiving_unit: formPayload.edoc_receiving_unit.value,
        };
        console.log(payload);
        this.editEntry(payload);
      }
    }
  }

  registerEntry(payload: IRegisterEntryPayload) {
    this.spinner.show();
    this.crudService.createData(this.edocumentsUrl.createEntry, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.spinner.hide();
          this.toastr.success('Entry Registered!', 'SUCCESSFUL');
          this.getEntries();
          this.dialogRef.close();
        }
      },
      error => {
        console.log(error);
        this.toastr.error(`${error.error?.responseMessage}`, 'UNSUCCESSFUL');
        this.spinner.hide();
      }
    );
  }

  editEntry(payload: IEditEntryPayload) {
    this.spinner.show();
    this.crudService.updateData(this.edocumentsUrl.editEntry, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.spinner.hide();
          this.toastr.success('Entry Details Updated!', 'SUCCESSFUL');
          this.getEntries();
          this.dialogRef.close();
        }
      },
      error => {
        console.log(error);
        this.toastr.error(`${error.error?.responseMessage}`, 'UNSUCCESSFUL');
        this.spinner.hide();
      }
    );
  }

  deleteEntry(id) {
    this.spinner.show();
    this.crudService.deleteData(`${this.edocumentsUrl.deleteEntry}/ED/${id}`, '').subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.spinner.hide();
          this.toastr.success('Entry Deleted', 'SUCCESSFUL');
          this.getEntries();
          this.dialogRef.close();
        }
      },
      error => {
        console.log(error);
        this.toastr.error(`${error.error?.responseMessage}`, 'UNSUCCESSFUL');
        this.spinner.hide();
      }
    );
  }

  getEntries(query?: string) {
    this.spinner.show();
    let edocumentUrl = '';
    if (query && query !== '' && query !== null) {
      edocumentUrl = `${this.edocumentsUrl.getEntry}?operation=ED&${query}`;
    } else {
      edocumentUrl = `${this.edocumentsUrl.getEntry}?operation=ED`;
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
            return {name: `${doc.edoc_doc_name}`, id: doc.edoc_id};
          });
          this.entryItems$ = of(response);
          console.log(this.entryItems$);
        }
      },
      error => {
        this.spinner.hide();
        this.toastr.error(`${error.error?.responseMessage}`, 'UNSUCCESSFUL');
        console.log(error);
      }
    );
  }

  displayFilter(filterselection) {
    console.log(filterselection);
    this.filterOption = filterselection;
  }

  openModal(dialog: TemplateRef<any>, options, updateObj?) {
    if (updateObj && options === 'edit') {
      this.edocId = updateObj.edoc_id;
      const receivingUnit = this.units.filter(unit => unit.name === updateObj.edoc_receiving_unit);
      console.log('receivingUnit: ', receivingUnit);
      console.log('emps: ', this.emps);
      const receivedBy =
      this.emps.filter(emp => `${emp.emp_firstname} ${emp.emp_lastname}`.toLowerCase() === `${updateObj.edoc_received_by}`.toLowerCase());
      console.log('receivedBy: ', receivedBy);
      const edocDateRecieved = new Date(updateObj.edoc_date_received);
      const edocDate =
        `${edocDateRecieved.getFullYear().toString()}-${(edocDateRecieved.getMonth() + 1).toString().padStart(2, '0')}-${edocDateRecieved.getDate().toString().padStart(2, '0')}`;
      this.entryForm.removeControl('edoc_file');
      this.entryForm.removeControl('edoc_image_byte');
      this.entryForm.patchValue({
        edoc_doc_name: updateObj.edoc_doc_name,
        edoc_doc_desc: updateObj.edoc_doc_desc,
        edoc_received_by: receivedBy[0].emp_id,
        edoc_receiving_unit: receivingUnit[0].code,
        edoc_doc_title: updateObj.edoc_doc_title,
        edoc_doc_ref: updateObj.edoc_doc_ref,
        edoc_date_received: edocDate
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
    }
  }

  entryAction(dialog: TemplateRef<any>, act, actionObj) {
    if (act === 'delete') {
      const modalData = {
        action: act,
        question: `Do you want to ${act} this entry?`,
        id: actionObj.edoc_id
      };
      this.openModal(dialog, modalData);
    }
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

  handleFileInput(uploadedFile: FileList) {
    console.log(uploadedFile);
    const file = uploadedFile[0];
    const reader = new FileReader();

    let fileData;
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      fileData = {
        file_name: file.name,
        image_byte: reader.result
      };
      this.entryForm.patchValue({
        edoc_image_byte: fileData
      });
    };

    this.cd.markForCheck();
  }

  clearForm() {
    this.entryForm.reset();
  }

  close() {
    this.dialogRef.close();
  }
}
