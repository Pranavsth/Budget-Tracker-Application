import { Component,OnInit } from '@angular/core';
import { Data } from '../data';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  view_form:boolean=false;
  edit_mode:boolean = false;
  filter_on:boolean=false;
  totalIncome:number 
  totalExpense:number
  filter_totalIncome: number;
  filter_totalExpense: number;
  // balance:number =this.totalIncome-this.totalExpense;
  addForm: FormGroup;
  editForm: FormGroup;
  data:Data;
  editValue:Data;
  filteredList:Data[];
  editIndex:number;
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

  this.updateSummary();
  }

  logout(){
    this.authService.logout();
  }
  onAddClick(){
    this.view_form=true;
  }

  setview_formToFalse(){
    this.view_form=false;
  }
  
  setedit_modeToFalse(){
    this.edit_mode=false;
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

  onEditButton(index:number){
    this.edit_mode=true;
    let i = this.allData.length-1-index;
    this.editIndex=index;
    this.editValue = {description:this.allData[i].description, amount:this.allData[i].amount, date:this.allData[i].date, type:this.allData[i].type, reoccuring : this.allData[i].reoccuring
  }
  }

  onSubmitEdit(){
    console.log(this.editIndex,this.editValue);
    this.dataService.editData(this.editIndex,this.editValue);
    this.edit_mode=false;
    this.updateSummary();
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

  filterRequestReoccuring(filterOption:string){
    if(this.filter_on == false){
    this.filter_on = true;
    this.filteredList = this.allData.filter(data=>data?.reoccuring.toLowerCase().includes(filterOption.toLowerCase()));
    console.log(this.filteredList);}
    else{
      this.filteredList = this.filteredList.filter(data=>data?.reoccuring.toLowerCase().includes(filterOption.toLowerCase()));
    }
    this.updateFilter();
  }

  filterRequestType(filterOption:string){
    if(this.filter_on == false){
      this.filter_on=true;
    this.filteredList = this.allData.filter(data=>data?.type.toLowerCase().includes(filterOption.toLowerCase()));
    console.log(this.filteredList);}
    else{
      this.filteredList = this.filteredList.filter(data=>data?.type.toLowerCase().includes(filterOption.toLowerCase()));
    }
    this.updateFilter();
  }

  filterRequestDate(filterOption:string){
    var filterdate=new Date();
    var todaydate = new Date();
    todaydate.setDate(todaydate.getDate());
  
      if(filterOption=='sevenDays'){
        filterdate.setDate(filterdate.getDate()-7);
        console.log(filterdate);
      }
      else if(filterOption=='thirtyDays'){
        filterdate.setDate(filterdate.getDate()-30);
      }
    else if(filterOption=='sixtyDays'){
      filterdate.setDate(filterdate.getDate()-60);
    }
    else{
      filterdate.setDate(filterdate.getDate()-90);
    }

    if(this.filter_on==false){
      this.filter_on=true;
    this.filteredList = this.allData.filter(data=>new Date(data.date)>=filterdate && new Date(data.date)<=todaydate);
    }
    else{
      this.filteredList = this.filteredList.filter(data=>new Date(data.date)>=filterdate && new Date(data.date)<=todaydate)
    }
    this.updateFilter();
  }

  updateFilter(){
    this.filter_totalIncome = this.filteredDataIncome();
    this.filter_totalExpense=this.filteredDataExpense();
  }

  filteredDataIncome(){
    var total = 0;
    for(let i=0; i<this.filteredList.length;i++){
      if(this.filteredList[i].type === "income"){
        total+=this.filteredList[i].amount;
      }
    }
    return total;
  }

  filteredDataExpense(){
    var total = 0;
    for(let i=0;i<this.filteredList.length;i++){
      if(this.filteredList[i].type === "expense"){
        total+=this.filteredList[i].amount;
      }
    }
    return total;
  }

  filterClose(){
    this.filter_on=false;
  }
}
