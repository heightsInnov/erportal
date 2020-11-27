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
  handoverNotes: any[];
  constructor(
    private router: Router,
    private crudService: CrudService,

  ) { }

  ngOnInit(): void {
    this.getHandoverNotes(this.getHandoverNotesUrl);
  }

  getHandoverNotes(url: string) {
    this.crudService.getData(url).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00'){
          this.handoverNotes = data.responseObject;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
