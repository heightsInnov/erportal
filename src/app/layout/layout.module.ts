import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
// import { BreadcrumbModule as BM} from 'xng-breadcrumb';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {BreadcrumbModule} from 'angular-crumbs';
import { RemoveHyphenPipe } from '../core/pipes/remove-hyphen.pipe';
import { MaterialModule } from '../core/shared/material.module';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SideNavComponent, BreadcrumbComponent, RemoveHyphenPipe],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FullCalendarModule,
    BreadcrumbModule
  ],
  exports: [HeaderComponent, FooterComponent, SideNavComponent, BreadcrumbComponent, RemoveHyphenPipe],
})
export class LayoutModule { }
