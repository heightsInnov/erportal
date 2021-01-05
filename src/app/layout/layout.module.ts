import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { NbUserModule, NbContextMenuModule } from '@nebular/theme';
import { BreadcrumbModule as BM} from 'xng-breadcrumb';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {BreadcrumbModule} from 'angular-crumbs';
// import { NbMenuModule } from '@nebular/theme';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, SideNavComponent, BreadcrumbComponent],
  imports: [
    CommonModule,
    RouterModule,
    NbUserModule,
    NbContextMenuModule,
    BreadcrumbModule,
    BM
    // NbMenuModule
  ],
  exports: [HeaderComponent, FooterComponent, SideNavComponent, BreadcrumbComponent],
})
export class LayoutModule { }
