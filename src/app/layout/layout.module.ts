import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
// import { NbMenuModule } from '@nebular/theme';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, SideNavComponent],
  imports: [
    CommonModule,
    RouterModule,
    // NbMenuModule
  ],
  exports: [HeaderComponent, FooterComponent, SideNavComponent],
})
export class LayoutModule { }
