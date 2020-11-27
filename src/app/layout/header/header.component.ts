import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userDetails: any;
  constructor(
    private sidebarService: NbSidebarService
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  getUserDetails() {
    this.userDetails = JSON.parse(localStorage.getItem('user'));
  }
}
