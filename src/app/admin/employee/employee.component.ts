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
  allEmployees: any;
  currentPage = 0;
  pages = 0;
  fakeArray = [];

  constructor(
    private router: Router,
    private crudService: CrudService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
   }

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee(pageNo?) {
    let pageNumber = pageNo || 0;
    let url = `${this.getAllEmployeeUrl}?pageNumber=${pageNumber}`;
    this.crudService.getData(url).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00'){
          this.allEmployees = data.responseObject;
          this.currentPage = this.allEmployees.pageable.pageNumber + 1;
          this.pages = this.allEmployees.totalPages;
          this.fakeArray = new Array(this.pages);
        }
      },
      error => {
        console.log(error);
        this.spinner.hide();
        this.toastr.error(error.error.responseMessage);
      }
    );
  }



  movePrev(){
    if(this.currentPage > 1){
      this.getAllEmployee(this.currentPage - 1);
    }
  }

  moveNext(){
    if(this.currentPage > 1 && this.pages > 1){
      this.getAllEmployee(this.currentPage);
    }
  }

  moveHere(pageNo){
    this.getAllEmployee(pageNo);
  }

}
