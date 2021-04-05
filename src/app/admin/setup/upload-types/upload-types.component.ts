import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-types',
  templateUrl: './upload-types.component.html',
  styleUrls: ['./upload-types.component.css']
})
export class UploadTypesComponent implements OnInit {

  uploadTypeForm: FormGroup;

  fetchUploadsUrl = environment.getUploadTypesUrl;
  uploadUrl = environment.setupUrl.upload_type;

  dialogRef: MatDialogRef<TemplateRef<any>>;
  actionLoading: boolean;
  uploadTypes: any[] = [];

  userDetails = JSON.parse(localStorage.getItem('user'));

  constructor(
    private crudService: CrudService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getUploadTypes();
  }

  initForm() {
    this.uploadTypeForm = this.fb.group({
      uploadname: [null, Validators.required],
      uploadcat: [null, Validators.required]
    });
  }

  get uploadTypeFormData() {
    return this.uploadTypeForm.controls;
  }

  onSubmit(formPayload: { [key: string]: AbstractControl }) {
    const payload = {
      uploadname: formPayload.uploadname.value,
      uploadcat: formPayload.uploadcat.value
    };
    this.createUploadType(payload);
  }

  getUploadTypes() {
    this.crudService.getData(this.fetchUploadsUrl).subscribe(
      data => {
        if (data.responseCode === '00') {
          this.uploadTypes = data.responseObject.user_types;
        } else if (data.responseObject === '99') {
          // console.log('error: ', error);
          this.toastr.error('Failed to fetch upload types', 'ERROR');
        }
      },
      error => {
        console.log('error: ', error);
        this.toastr.error('Failed to fetch upload types', 'ERROR');
      }
    );
  }

  createUploadType(payload) {
    this.actionLoading = true;
    const createUploadTypeUrl = `${this.uploadUrl}/${this.userDetails?.username}?action=C`;
    this.crudService.createData(createUploadTypeUrl, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.actionLoading = false;
          this.clearForm(this.uploadTypeForm);
          this.close();
          this.toastr.success('Upload type Created', 'SUCCESSFUL');
          this.getUploadTypes();
        } else if (data.responseCode === '99') {
          this.actionLoading = false;
          this.toastr.error('Sorry, failed to create Upload type')
        }
      },
      error => {
        console.log('error: ', error);
        this.actionLoading = false;
        this.toastr.error('Sorry, failed to create Upload type')
      }
    )
  }

  deleteUploadType(payload) {
    console.log(payload);
    this.actionLoading = true;
    const deleteUnitUrl = `${this.uploadUrl}/${this.userDetails?.username}?action=D`;
    this.crudService.deleteData(deleteUnitUrl, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.actionLoading = false;
          this.close();
          this.toastr.success('Upload type Deleted')
          this.getUploadTypes();
        } else if (data.responseCode === '99') {
          this.actionLoading = false;
          this.toastr.error('Sorry, failed to delete upload type')
        }
      },
      error => {
        console.log('error: ', error);
        this.actionLoading = false;
        this.toastr.error('Sorry, failed to delete upload type')
      }
    )
  }


  openModal(dialog: TemplateRef<any>, options?) {
   if (options) {
      console.log(options);
   }

    this.dialogRef = this.dialog.open(
      dialog,
      {
        data: options
      }
    );
  }

  submitModal(modalData) {
    console.log(modalData);
    const payload = {
      uploadid: modalData.extraData.id
    }
    this.deleteUploadType(payload);
  }

  clearForm(form: FormGroup) {
    form.reset();
  }

  close() {
    this.dialogRef.close();
  }

}
