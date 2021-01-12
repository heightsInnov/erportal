import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  getAllEmployeeUrl = environment.getAllEmployeeUrl;
  allEmployees: any[];

  constructor(
    private router: Router,
    private crudService: CrudService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
   }

  ngOnInit(): void {
    this.getAllEmployee(this.getAllEmployeeUrl);
  }

  getAllEmployee(url: string) {
    this.crudService.getData(url).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00'){
          this.allEmployees = data.responseObject;
        }
      },
      error => {
        console.log(error);
        this.spinner.hide();
        this.toastr.error(error.error.responseMessage);
      }
    );
  }

}
