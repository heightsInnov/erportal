import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  getHandoverNotesUrl = environment.getHandoverNotesUrl;
  handoverNotes: any;
  currentPage = 0;
  pages = 0;
  fakeArray = [];

  constructor(
    private router: Router,
    private crudService: CrudService,

  ) { }

  ngOnInit(): void {
    this.getHandoverNotes();
  }

  getHandoverNotes(pageNo?) {
    let pageNumber = pageNo || 0;
    let url = `${this.getHandoverNotesUrl}?pageNumber=${pageNumber}`
    this.crudService.getData(url).subscribe(
      data => {
        if (data.responseCode === '00'){
          this.handoverNotes = data.responseObject;
          this.currentPage = this.handoverNotes.pageable.page + 1;
          this.pages = this.handoverNotes.pageable.totalPages;
          this.fakeArray = new Array(this.pages);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  movePrev(){
    if(this.currentPage > 1){
      this.getHandoverNotes(this.currentPage - 2);
    }
  }

  moveNext(){
    if(this.currentPage > 0 && this.pages > 1){
      this.getHandoverNotes(this.currentPage);
    }
  }

  moveHere(pageNo){
    this.getHandoverNotes(pageNo);
  }

}
