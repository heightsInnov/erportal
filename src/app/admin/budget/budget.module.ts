import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewBudgetComponent } from './view-budget/view-budget.component';
import { CreateBudgetComponent } from './create-budget/create-budget.component';
import { BudgetComponent } from './budget.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: BudgetComponent
  },
  {
    path: 'create-budget',
    component: CreateBudgetComponent
  },
  {
    path: 'view-budget',
    component: ViewBudgetComponent
  }
];
@NgModule({
  declarations: [BudgetComponent, CreateBudgetComponent, ViewBudgetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BudgetModule { }
