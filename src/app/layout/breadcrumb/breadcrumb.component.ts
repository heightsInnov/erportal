import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class BreadcrumbComponent implements OnInit {
  currentRoute: string;

  constructor(
    private router: Router,
    private location: Location
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
              this.currentRoute = event.url.substring(i).slice(1);
              this.currentRoute = this.currentRoute.includes('?')
                                    ? this.currentRoute.slice(0, this.currentRoute.indexOf('?')) : this.currentRoute;
             }
           });
  }

  goBack(): void {
    this.location.back();
  }

  goForward(): void {
    this.location.forward();
  }

}
