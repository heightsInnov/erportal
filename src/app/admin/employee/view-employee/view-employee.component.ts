import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employeeDetails: {username: any, id: any};
  employeeProfile;
  uploadForm: FormGroup;
  uploadTypes: any[];
  getEmployeeProfileUrl = environment.employeeProfileUrl;
  getUploadTypesUrl = environment.getUploadTypesUrl;
  uploadUserDocumentsUrl = environment.uploadEmployeeDocumentUrl;
  imageBaseData: string | ArrayBuffer = null;
  tabTitle = {
    title_one: 'overview',
    title_two: 'documents'
  };
  filesForUpload = [];
  getUploadedDocumentsUrl = environment.getEmployeeUploadsUrl;
  uploadedDocuments: any[];
  modal: MatDialogRef<TemplateRef<any>>;

  queryParams: any;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private crudService: CrudService,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { 
    this.queryParams = this.route.snapshot.queryParamMap;
    this.queryParams = this.queryParams.params;
  }

  ngOnInit(): void {
    this.getEmployeeUsername();
    this.initForm();
    this.getUploadTypes();
  }

  getEmployeeUsername() {
    console.log(this.queryParams.id)
    if(this.queryParams.username && this.queryParams.id){
      this.employeeDetails = {
        username: this.queryParams.username,
        id: this.queryParams.id
      };

      this.getEmployeeProfile();
      this.getUploadedDocuments();
    }
  }

  getEmployeeProfile() {
    const url = `${this.getEmployeeProfileUrl}/${this.employeeDetails.username}`;
    this.crudService.getData(url).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00'){
          this.employeeProfile = data.responseObject;
          console.log(this.employeeProfile);
        }
      },
      error => {
        console.log(error);
        this.spinner.hide();
        this.toastr.error('Unable to Fetch Employee Profile', 'An Error Occured')

      }
    );
  }

  initForm() {
    this.uploadForm = this.fb.group({
      upload_type: [null, Validators.required],
      fil: [null, Validators.required],
      file: [null, Validators.required]
    });
  }

  get uploadFormData() {
    return this.uploadForm.controls;
  }

  get getUploadedFile() {
    return this.filesForUpload;
  }

  handleFileInput(files: FileList) {
    console.log(files);
    const file = files[0];
    const reader = new FileReader();
    let fileData;
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      fileData = {
        upload_title: file.name,
        image_byte: reader.result
      };
      this.uploadForm.patchValue({
        file: fileData
      });
    };

    this.cd.markForCheck();
  }

  onSubmit(formPayload) {
    console.log(formPayload);
    const url = `${this.uploadUserDocumentsUrl}/${this.employeeDetails.username}`;
    // const fileForUpload = formPayload.file.value.map(obj => {
    //                                                           return {
    //                                                                     upload_type: formPayload.upload_type.value,
    //                                                                     upload_title: obj.upload_title,
    //                                                                     image_byte: obj.image_byte
    //                                                                   };
    //                                                         });
    // console.log(fileForUpload);
    const payload = {
      upload_type: formPayload.upload_type.value,
      upload_title: formPayload.file.value.upload_title,
      file_name: formPayload.file.value.upload_title,
      image_byte: formPayload.file.value.image_byte,
      // uploadRequest: formPayload.file.value,
      emp_id: `${this.employeeDetails?.id}`
    };
    this.crudService.uploadData(url, payload).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.close();
          this.toastr.success('File Upload Successful');
          this.getUploadedDocuments();
        } else if (data.responseCode === '99') {
          this.toastr.error('File Upload Unsuccessful');
        }
      },
      error => {
        console.log(error);
        this.spinner.hide();
        this.toastr.warning('File Upload Unsuccessful', 'An Error Occured');
      }
    );
    // if (this.imageBaseData==null){
    //   alert("Please select file");
    // } else{
    //   const fileUplodVM: FileUplodVM = {
    //     imageBaseData: this.imageBaseData.toString()
    //   };
    // }
  }

  getUploadedDocuments() {
    const url = `${this.getUploadedDocumentsUrl}/${this.employeeDetails.id}`;
    this.crudService.getData(url).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.uploadedDocuments = data.responseObject;
        }
      },
      error => {
        console.log(error);
        this.spinner.hide();
        this.toastr.warning('Unable to Fetch Uploaded Documents', 'An Error Occured');
      }
    );
  }

  getUploadTypes() {
    const url = this.getUploadTypesUrl;
    this.crudService.getData(url).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00') {
          this.uploadTypes = data.responseObject.user_types;
        }
      },
      error => {
        console.log(error);
        this.toastr.warning('Upload Types Unavailable');
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
function fileForUpload() {
  throw new Error('Function not implemented.');
}

