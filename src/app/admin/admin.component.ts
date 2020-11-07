import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  constructor(
    private router: Router,
    private sidebarService: NbSidebarService
  ) { }

  ngOnInit(): void {
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

}
