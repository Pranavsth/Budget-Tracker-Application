import { Injectable } from '@angular/core';
import { Data } from './data';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data:Data[]=[];
  constructor(private authService:AuthService) { }

  /*assigns a key to store data which is unique to each user, 
  this helps with authorization. i.e to only provide data concerned with the user*/
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
    this.data.splice(this.data.length-1-i,1,item); //replaces item at the same index index with edited data
    console.log("Edited data");
    console.log(this.data);
    this.saveData(userData,this.data);
  }

  //Logic to delete data
  deleteData(i:number){
    const userData = this.userDataKey();
    this.data = this.getAllData();
    this.data.splice(this.data.length-1-i,1); //deletes item at an index
    console.log(this.data);
    this.saveData(userData,this.data);
  }

  //To get all the data of the user
  getAllData():Data[]{
    const userData = this.userDataKey();
    this.data = JSON.parse(localStorage.getItem(userData)) || []; //Gets all the data of a user stored in localStorage having key which is unique to each user
    console.log(this.data);
    return this.data;
  }

  //Logic to store data using a key unique to each user
  saveData(userData:string,data:Data[]){
    localStorage.setItem(userData,JSON.stringify(this.data)); //Saves all the data of a user in localStorage with a key which is unique to each user
  }
}
