import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  handoverId;
  getHandoverDetailsUrl = environment.getHandoverDetailsUrl;
  handoverDetails;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private crudService: CrudService,
    // private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getStaffId();
  }

  getStaffId() {
    this.route.queryParamMap.subscribe(
      (params: ParamMap) => {
        if (params.get('handoverId') !== undefined) {
          this.handoverId = {
            id: params.get('handoverId')
          };
          this.getHandoverDetails();
        }
        console.log('staff_id: ', this.handoverId);
      }
    );
  }

  getHandoverDetails() {
    const url = `${this.getHandoverDetailsUrl}/${this.handoverId.id}`;
    this.crudService.getData(url).subscribe(
      data => {
        console.log(data);
        if (data.responseCode === '00'){
          this.handoverDetails = data.responseObject;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
