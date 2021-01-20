import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// import { NbMenuService, NbSidebarService } from '@nebular/theme';
// import { NbMenuItem } from '@nebular/theme';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  // items: NbMenuItem[] = [
  //   {
  //     title: 'Profile',
  //     icon: 'person-outline',
  //   },
  //   {
  //     title: 'Change Password',
  //     icon: 'lock-outline',
  //   },
  //   {
  //     title: 'Privacy Policy',
  //     icon: { icon: 'checkmark-outline', pack: 'eva' },
  //   },
  //   {
  //     title: 'Logout',
  //     icon: 'unlock-outline',
  //   },
  // ];

  constructor(
    // private sidebarService: NbSidebarService,
    // private menuService: NbMenuService
    ) {
  }

  ngOnInit(): void {}


  toggle() {
    // this.sidebarService.toggle(true);
    return false;
  }

}
