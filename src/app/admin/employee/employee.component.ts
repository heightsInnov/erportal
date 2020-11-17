import { Component, OnInit } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  employeeDetails = [
    {
      employeeName : '2020 employee',
      period : 'MONTHLY',
      startDate: '',
      endDate: '',
      amountApproved: 200000,
      amountUtilized: 50000,
      remainingAmount: 70000,
      utilization: '60%',
      createdBy: 'Precious Usanga',
      status: 'ACTIVE'
    },
    {
      employeeName : '2020 employee',
      period : 'QUATERLY',
      startDate: '',
      endDate: '',
      amountApproved: 1200000,
      amountUtilized: 500000,
      remainingAmount: 700000,
      utilization: '60%',
      createdBy: 'Precious Usanga',
      status: 'ACTIVE'
    },
    {
      employeeName : '2020 employee',
      period : 'YEARLY',
      startDate: '',
      endDate: '',
      amountApproved: 12000000,
      amountUtilized: 5000000,
      remainingAmount: 7000000,
      utilization: '60%',
      createdBy: 'Precious Usanga',
      status: 'ACTIVE'
    }
  ];

  constructor(
    private router: Router,
  ) {
   }

  ngOnInit(): void {
  }

}
