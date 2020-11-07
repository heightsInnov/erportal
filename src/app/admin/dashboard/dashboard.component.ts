import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() {
    // this.loadScripts();

  }

  ngOnInit(): void {
  }

  loadScripts() {
    const externalScriptArray = ['../../../assets/vendors/js/vendors.min.js',
      '../../../assets/vendors/js/charts/apexcharts.min.js', '../../../assets/vendors/js/extensions/tether.min.js',
      '../../../assets/vendors/js/extensions/shepherd.min.js', '../../../assets/js/core/app-menu.js',
      '../../../assets/js/core/app.js', '../../../assets/js/scripts/components.js',
      '../../../assets/js/scripts/pages/dashboard-analytics.js'
    ];
    for (let i = 0; i < externalScriptArray.length; i++) {
      const scriptTag = document.createElement('script');
      scriptTag.src = externalScriptArray[i];
      scriptTag.type = 'text/javascript';
      scriptTag.async = false;
      scriptTag.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(scriptTag);
    }
  }

}
