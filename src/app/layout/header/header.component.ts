import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userDetails: any;
  items = [
    {title: 'Profile', link: '/admin/employee/view-employee'},
    {title: 'Logout'}
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private router: Router,
    private auth: AuthService,
    private nbMenuService: NbMenuService,
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.avatarActions();
  }

  avatarActions() {
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-avatar-menu'),
        map(({ item }) => {
          if (item.link) {
            return {action: item.title.toLowerCase(), link: item.link};
          } else {
            return {action: item.title.toLowerCase()};
          }
        }),
      )
      .subscribe(menu => {
        if (menu.action === 'profile' && menu.link) {
          this.router.navigate([menu.link, this.userDetails.emp_username]);
        } else if (menu.action === 'logout') {
          this.auth.logout();
        }
      });
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  getUserDetails() {
    this.userDetails = JSON.parse(localStorage.getItem('user'));
  }
}