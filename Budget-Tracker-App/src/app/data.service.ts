import { Injectable } from '@angular/core';
import { Data } from './data';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data:Data[]=[];
  constructor(private authService:AuthService) { }

  //assigns a key to store data which is unique to each user
  private userDataKey(){
    return `data_${this.authService.username}`;
  }

  //Logic to add data and store it with a key unique to the user
  addData(item:Data){
    const userData = this.userDataKey();
    this.data = this.getAllData() || [];
    this.data.push(item);
    console.log(userData,this.data)
    this.saveData(userData,this.data)
  }
  
  //Logic to edit data and then store it
  editData(i:number, item:Data){
    const userData = this.userDataKey();
    this.data = this.getAllData();
    this.data.splice(this.data.length-1-i,1,item);
    console.log("Edited data");
    console.log(this.data);
    this.saveData(userData,this.data);
  }

  //Logic to delete data
  deleteData(i:number){
    const userData = this.userDataKey();
    this.data = this.getAllData();
    this.data.splice(this.data.length-1-i,1);
    console.log(this.data);
    this.saveData(userData,this.data);
  }

  //To get all the data of the user
  getAllData():Data[]{
    const userData = this.userDataKey();
    this.data = JSON.parse(localStorage.getItem(userData)) || [];
    console.log(this.data);
    return this.data;
  }

  //Logic to store data using a key unique to each user
  saveData(userData:string,data:Data[]){
    localStorage.setItem(userData,JSON.stringify(this.data));
  }
}
