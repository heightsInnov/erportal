import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './core/guards/auth.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { InternetInterceptor } from './core/interceptors/internet.interceptor';
// import { MaterialModule } from './core/shared/material.module';

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
  declarations: [
    AppComponent, NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // MaterialModule,
    FullCalendarModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    BreadcrumbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
              {provide: HTTP_INTERCEPTORS, useClass: InternetInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
              AuthGuard
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
