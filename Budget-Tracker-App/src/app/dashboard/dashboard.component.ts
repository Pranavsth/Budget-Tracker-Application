import { Component,OnInit } from '@angular/core';
import { Data } from '../data';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { FormControl, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  view_form:boolean=false;
  totalIncome:number 
  totalExpense:number
  // balance:number =this.totalIncome-this.totalExpense;
  addForm: FormGroup;
  data:Data;
  allData:Data[]=[];
  constructor(private authService:AuthService,private dataService:DataService){}

  ngOnInit(){
    this.addForm = new FormGroup({
      description: new FormControl(null,Validators.required),
      amount: new FormControl(null,Validators.required),
      date: new FormControl(null,Validators.required),
      type: new FormControl(null,Validators.required),
      reoccuring: new FormControl(null,Validators.required)
    });
  //  this.allData=this.getAllData();
  //  this.totalIncome= this.getTotalIncome();
  //  this.totalExpense = this.getTotalExpense();
  // replacing above code with updateSummary()
  this.updateSummary();
  }

  onAddClick(){
    this.view_form=true;
  }

  setview_formToFalse(){
    this.view_form=false;
  }
  
  onSubmit(){
    if(!this.addForm.valid){
      alert('Fill all the details');
    }
    else{
    console.log(this.addForm.value);
    this.data={
      type:this.addForm.value.type,
      description:this.addForm.value.description,
      amount: this.addForm.value.amount,
      date: this.addForm.value.date,
      reoccuring: this.addForm.value.reoccuring
    };
   this.dataService.addData(this.data);
   this.updateSummary();
   console.log('Alldata');
   console.log(this.allData);
   this.addForm.reset();
   alert('Entry success!')
   this.view_form = false;
  }
  }

  onDeleteButton(index:number){

    this.dataService.deleteData(index);
    this.updateSummary();
  }

  updateSummary(){
    this.allData = this.getAllData();
    this.totalIncome= this.getTotalIncome();
   this.totalExpense = this.getTotalExpense();
  }

  getAllData(){
    return this.dataService.getAllData();
  }


  getBalance(){}

  getTotalIncome(){
    var total = 0;
    for(let i=0; i<this.allData.length;i++){
      if(this.allData[i].type === "income"){
        total+=this.allData[i].amount;
      }
    }
    console.log('TOTALINCOME');
    console.log(total);
    return total;
  }

  getTotalExpense(){
    var total = 0;
    for(let i=0;i<this.allData.length;i++){
      if(this.allData[i].type === "expense"){
        total+=this.allData[i].amount;
      }
    }
    console.log('TOTALEXPENSE');
    console.log(total);
    return total;
   
  }

}
