import { Component } from '@angular/core';
import { Income } from '../income';
import { Expense } from '../expense';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  view_form:boolean=false;;
  income:Income;
  expense:Expense;

  constructor(){}

  onAddClick(){
    this.view_form=true;
  }

  setview_formToFalse(){
    this.view_form=false;
  }
  
  onSubmit(){}

  addIncome(){}

  addExpense(){}

  getBalance(){}

  getTotalIncome(){}

  getTotalExpense(){}

}
