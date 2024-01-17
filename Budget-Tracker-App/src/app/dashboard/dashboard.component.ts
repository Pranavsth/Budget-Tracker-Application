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

  view_form:boolean=false; //This property is used to display the form to add contents and hide the initial view.
  edit_mode:boolean = false;//This property is used to display the edit form and hide the default (initial) view.
  filter_on:boolean=false;//This property is used to display the filtered contents only
  totalIncome:number 
  totalExpense:number
  filter_totalIncome: number;
  filter_totalExpense: number;
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
    });//Form to get the new data

  this.updateSummary();  
  /*To update the view after adding, editing or deleting data. In this case to get all the data
  and show it in the view on initialization*/
  }

  logout(){
    this.authService.logout();
  }

  //On clicking add button this method allows to show the form to add data only.
  onAddClick(){
    this.view_form=true;
  }

  //After submitting the form to add data or closing it, this method allows to show the default view.
  setview_formToFalse(){
    this.view_form=false;
  }
  
  //After submitting the form to edit data or closing it, this method allows to show the default view.
  setedit_modeToFalse(){
    this.edit_mode=false;
  }

  //On submitting the form after adding data
  onSubmit(){

    //If the form is not valid i.e. All data re not entered
    if(!this.addForm.valid){
      alert('Fill all the details');
    }
    //Logic to add data if form is entered correctly
    else{
    console.log(this.addForm.value);//Checking if the form logic is implemented correctly
    this.data={
      type:this.addForm.value.type,
      description:this.addForm.value.description,
      amount: this.addForm.value.amount,
      date: this.addForm.value.date,
      reoccuring: this.addForm.value.reoccuring
    };//To read all the data in the form and assign it to data property
   this.dataService.addData(this.data); //Adds data and stores it
   this.updateSummary(); //Updates the view with newly added data along with the summary
   console.log('Alldata');
   console.log(this.allData)//Checking if data are correctly stored and retrieved
   this.addForm.reset(); //Resets form by clearing the formControl values after adding data.
   alert('Entry success!')
   this.view_form = false;
  }
  }

//On clicking Edit button
  onEditButton(index:number){
    this.edit_mode=true;
    let i = this.allData.length-1-index;
    this.editIndex=index;
    this.editValue = {description:this.allData[i].description, amount:this.allData[i].amount, date:this.allData[i].date, type:this.allData[i].type, reoccuring : this.allData[i].reoccuring
      //editValue takes in the values of the data which is to be edited to display it in form.
    }
  }

  //After submitting form after editing data
  onSubmitEdit(){
    console.log(this.editIndex,this.editValue);
    this.dataService.editData(this.editIndex,this.editValue);
    this.edit_mode=false;
    this.updateSummary();
  }

  //To delete data
  onDeleteButton(index:number){

    this.dataService.deleteData(index);
    this.updateSummary();
  }

  //Logic to update the view after adding, editing or deleting data
  updateSummary(){
    this.allData = this.getAllData(); //First get all the data from the storage to update the list of data.
    this.totalIncome= this.getTotalIncome(); // Then calculate total income of data that is of type income.
   this.totalExpense = this.getTotalExpense();//Then calculate total expense of data that is of type expense.
  }

  //Gets all the user data
  getAllData(){
    return this.dataService.getAllData();
  }

  //Calculate total income of 'income' type data
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

  //Calaculate total expense of 'expense' type data
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

  //To filter based on reoccuring
  filterRequestReoccuring(filterOption:string){

    //If filter hasn't been used yet then filter content among all the data
    if(this.filter_on == false){ 

      this.filter_on = true; //Set filter_on to true to change the view to display filtered content
      this.filteredList = this.allData.filter(data=>data?.reoccuring.toLowerCase().includes(filterOption.toLowerCase()));
      console.log(this.filteredList);}// Just to check the data.

    //If filter has already been used then filter the content based on previous filteredList.
    else{ 

      this.filteredList = this.filteredList.filter(data=>data?.reoccuring.toLowerCase().includes(filterOption.toLowerCase()));
    }

    this.updateFilter();//To update the data in the filteredList and view in filter mode.
  }

  //To filter based on type
  filterRequestType(filterOption:string){

    if(this.filter_on == false){

      this.filter_on=true;
      this.filteredList = this.allData.filter(data=>data?.type.toLowerCase().includes(filterOption.toLowerCase()));
      console.log(this.filteredList);
    }

    else{

      this.filteredList = this.filteredList.filter(data=>data?.type.toLowerCase().includes(filterOption.toLowerCase()));
    }

    this.updateFilter();
  }

  //To filter based on date range
  filterRequestDate(filterOption:string){

    var filterdate=new Date();
    var todaydate = new Date();
    todaydate.setDate(todaydate.getDate()); //Get today's date
  
      if(filterOption=='sevenDays')
      { //For last 7 days
        filterdate.setDate(filterdate.getDate()-7); //sets filterdate to date that was 7 days before
        console.log(filterdate);
      }

      else if(filterOption=='thirtyDays')
      {//For last 30 days
        filterdate.setDate(filterdate.getDate()-30); //sets filterdate to date that was 30 days before
      }
    else if(filterOption=='sixtyDays')
    {//For last 60 days
      filterdate.setDate(filterdate.getDate()-60); //sets filterdate to date that was 60 days before
    }

    else
    {//For last 90 days
      filterdate.setDate(filterdate.getDate()-90); //sets filterdate to date that was 90 days before
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

  //To update view after enabling our choice of filter
  updateFilter(){
    this.filter_totalIncome = this.filteredDataIncome();
    this.filter_totalExpense=this.filteredDataExpense();
  }

  //Total income of filtered content
  filteredDataIncome(){
    var total = 0;
    for(let i=0; i<this.filteredList.length;i++){
      if(this.filteredList[i].type === "income"){
        total+=this.filteredList[i].amount;
      }
    }
    return total;
  }

  //Total Expense of filtered content
  filteredDataExpense(){
    var total = 0;
    for(let i=0;i<this.filteredList.length;i++){
      if(this.filteredList[i].type === "expense"){
        total+=this.filteredList[i].amount;
      }
    }
    return total;
  }

  //To change the view to default view from filtered view after 'Reset' button is clicked
  filterClose(){
    this.filter_on=false;
  }
}
