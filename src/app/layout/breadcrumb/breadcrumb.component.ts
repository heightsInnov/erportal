import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Router, NavigationEnd, ActivatedRoute  } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  currentRoute;

  constructor(
    // private breadcrumbService: BreadcrumbService,
    private router: Router,
    // private route: ActivatedRoute
  ) {
    // console.log(this.router.url);
    // const url: Observable<string> = this.route.url.pipe(map(segments => {console.log(segments); return segments.join(' ')}));
    // this.router.events.subscribe(
    //   event => {
    //          if (event instanceof NavigationEnd) {
    //           const i = event.url.lastIndexOf('/');
    //           this.currentRoute = event.url.substring(i);
    //           console.log(event);
    //          }
    //        });
    }

  ngOnInit(): void {
    this.router.events.subscribe(
      event => {
             if (event instanceof NavigationEnd) {
              const i = event.url.lastIndexOf('/');
              this.currentRoute = event.url.substring(i);
              console.log(event);
             }
           });
  }

}
