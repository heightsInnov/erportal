import { Component, OnInit } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { CreateBudgetComponent } from './create-budget/create-budget.component';
import { ViewBudgetComponent } from './view-budget/view-budget.component';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})

export class BudgetComponent implements OnInit {

  budgetDetails = [
    {
      budgetName : '2020 Budget',
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
      budgetName : '2020 Budget',
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
      budgetName : '2020 Budget',
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
