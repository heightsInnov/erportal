import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectDetails = [
    {
      projectName : 'Road Construction',
      description: '2.5Km Ijebu-Ode Road Construction',
      budget: '2020 Budget',
      startDate: '',
      endDate: '',
      amountApproved: 2000,
      amountUtilized: 500,
      remainingAmount: 700,
      utilization: '60%',
      awardedTo: 'Precious Usanga',
      status: 'Ongoing'
    },
    {
      projectName : 'Classroom Construction',
      description: '2000 block classroom construction in rural areas',
      budget: '2020 Budget',
      startDate: '',
      endDate: '',
      amountApproved: 12000,
      amountUtilized: 5000,
      remainingAmount: 7000,
      utilization: '60%',
      awardedTo: 'Ayotola Jinadu',
      status: 'Ongoing'
    },
    {
      projectName : 'Street Light Repairs',
      description: 'Repair of all bad street light in the state',
      budget: '2020 Budget',
      startDate: '',
      endDate: '',
      amountApproved: 1000000,
      amountUtilized: 1000000,
      remainingAmount: 1000000,
      utilization: '100%',
      awardedTo: 'Precious Usanga',
      status: 'Completed'
    }
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
