import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  budgetList = [
    {
      budget: '2020 Budget',
      value: '2020budget'
    },
    {
      budget: '2020 QUATERLY Budget',
      value: '2020quaterBudget'
    },
    {
      budget: '2020 MONTHLY Budget',
      value: '2020monthlyBudget'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
