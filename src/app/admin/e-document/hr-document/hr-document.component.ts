import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hr-document',
  templateUrl: './hr-document.component.html',
  styleUrls: ['./hr-document.component.css']
})
export class HrDocumentComponent implements OnInit {

  employeeDetails = JSON.parse(localStorage.getItem('user'));
  uploadForm: FormGroup;
  uploadTypes: any[];
  getUploadTypesUrl = environment.getUploadTypesUrl;
  uploadUserDocumentsUrl = environment.uploadEmployeeDocumentUrl;
  getHrDocUrl = environment.edocumentsUrl.hrDocuments;
  filesForUpload: any[];
  getUploadedDocumentsUrl = environment.getEmployeeUploadsUrl;
  uploadedDocuments: any[];
  modal: MatDialogRef<TemplateRef<any>>;


  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private crudService: CrudService,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getUploadTypes();
    this.getHrDocs();
  }

  getHrDocs() {
    this.crudService.getData(this.getHrDocUrl).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  initForm() {
    this.uploadForm = this.fb.group({
      upload_type: [null, Validators.required],
      file: [null, Validators.required]
    });
  }

  get uploadFormData() {
    return this.uploadForm.controls;
  }

  handleFileInput(files: FileList) {
    console.log(files);
    // const file = files[0];
    const reader = new FileReader();
    for (let i = 0; i < files.length; i++) {
      let fileData;
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        console.log(reader.result);
        fileData = {
          upload_title: files[i].name,
          image_byte: reader.result
        };
      };
      this.filesForUpload.push(fileData);
    }
    this.uploadForm.patchValue({
      file: this.filesForUpload
    });

    this.cd.markForCheck();
  }

  onSubmit(formPayload) {
    console.log(formPayload);
    const url = `${this.uploadUserDocumentsUrl}/${this.employeeDetails?.emp_username}`;
    const filesForUpload = formPayload.file.value.map(obj => {
                                                              return {
                                                                        upload_type: formPayload.upload_type.value,
                                                                        upload_title: obj.upload_title,
                                                                        image_byte: obj.image_byte
                                                                      };
                                                            });
    console.log(filesForUpload);
    const payload = {
      uploadRequest: filesForUpload
    };
    this.crudService.uploadData(url, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.close();
          this.toastr.info('HR Document Upload Successful');
        }
      },
      error => {
        console.log(error);
        this.spinner.hide();
        this.toastr.warning('HR Document Upload Unsuccessful', 'An Error Occured')
      }
    );
  }

  getUploadTypes() {
    const url = this.getUploadTypesUrl;
    this.crudService.getData(url).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.uploadTypes = data.responseObject;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  openModal(dialog: TemplateRef<any>, options) {
    this.modal = this.dialog.open(
      dialog,
      {
        data: options
      }
    );
  }

  clearForm() {
    this.uploadForm.reset();
  }

  close() {
    this.modal.close();
  }

}
