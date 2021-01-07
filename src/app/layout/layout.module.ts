import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule as BM} from 'xng-breadcrumb';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {BreadcrumbModule} from 'angular-crumbs';
import { RemoveHyphenPipe } from '../core/pipes/remove-hyphen.pipe';
import { MaterialModule } from '../core/shared/material.module';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, SideNavComponent, BreadcrumbComponent, RemoveHyphenPipe],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    BreadcrumbModule,
    BM
  ],
  exports: [HeaderComponent, FooterComponent, SideNavComponent, BreadcrumbComponent, RemoveHyphenPipe],
})
export class LayoutModule { }
