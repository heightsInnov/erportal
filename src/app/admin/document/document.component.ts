import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  filterList = [{name: 'Video', value: 'video'}, {name: 'Text', value: 'text'}, {name: 'Pictures', value: 'pictures'}];
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

  documentList: [
  {
    name: '',
    description: '',
    format: '',
    uploadedBy: '',
    uploadedTime: Date
  }
]

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
  }

}
