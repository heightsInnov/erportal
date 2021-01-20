import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
// import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  classList = ['vertical-layout', 'vertical-menu-modern', '2-columns', 'navbar-floating', 'footer-static'];

  constructor(
    private router: Router,
    // private sidebarService: NbSidebarService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    for (const val of this.classList ) {
      this.renderer.addClass(this.document.body, val);
    }
    this.renderer.setAttribute(this.document.body, 'data-open', 'click');
    this.renderer.setAttribute(this.document.body, 'data-menu', 'vertical-menu-modern');
    this.renderer.setAttribute(this.document.body, 'data-col', '2-columns');
  }

  toggle() {
    // this.sidebarService.toggle(true);
    return false;
  }

}
