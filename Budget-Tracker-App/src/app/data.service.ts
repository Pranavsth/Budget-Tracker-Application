import { Injectable } from '@angular/core';
import { Data } from './data';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data:Data[]=[];
  constructor(private authService:AuthService) { }

  private userDataKey(){
    return `data_${this.authService.username}`;
  }
  addData(item:Data){
    const userData = this.userDataKey();
    this.data = this.getAllData() || [];
    this.data.push(item);
    console.log(userData,this.data)
    this.saveData(userData,this.data)
  }
  
  editData(i:number, item:Data){
    const userData = this.userDataKey();
    this.data = this.getAllData();
    this.data.splice(this.data.length-1-i,1,item);
    console.log("Edited data");
    console.log(this.data);
    this.saveData(userData,this.data);
  }

  deleteData(i:number){
    const userData = this.userDataKey();
    this.data = this.getAllData();
    this.data.splice(this.data.length-1-i,1);
    console.log(this.data);
    this.saveData(userData,this.data);
  }

  getAllData():Data[]{
    const userData = this.userDataKey();
    this.data = JSON.parse(localStorage.getItem(userData)) || [];
    console.log(this.data);
    return this.data;
  }

  saveData(userData:string,data:Data[]){
    localStorage.setItem(userData,JSON.stringify(this.data));
  }
}
