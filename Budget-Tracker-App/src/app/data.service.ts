import { Injectable } from '@angular/core';
import { Data } from './data';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data:Data[]=[];
  constructor(private authService:AuthService) { }

  addData(item:Data){
    const userData = `data_${this.authService.username}`;
    this.data = this.getAllData() || [];
    this.data.push(item);
    console.log(userData,this.data)
    this.saveData(userData,this.data)
  }
  
  deleteData(i:number){
    const userData = `data_${this.authService.username}`;
    this.data = this.getAllData();
    this.data.splice(this.data.length-1-i,1);
    console.log(this.data);
    this.saveData(userData,this.data);
  }

  getAllData():Data[]{
    const userData = `data_${this.authService.username}`;
    this.data = JSON.parse(localStorage.getItem(userData)) || [];
    console.log(this.data);
    return this.data;
  }

  saveData(userData:string,data:Data[]){
    localStorage.setItem(userData,JSON.stringify(this.data));
  }
}
