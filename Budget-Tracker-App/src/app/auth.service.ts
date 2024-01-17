import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public username:string; //Made public to use across other services or components, if required, after user logs in.
  constructor(private router:Router) { }

  //Assigns a unique userKey to the user to store their credentials
   private getUserKey(username:string):string{
    return `user_${username}`;
  }

  //To assign the username property of this service
  userName(username:string){
    this.username=username;
  }

  //To register a user with their username and password, and store it.
  register(username:string,password:string):void{
    const user={ username,password };
    const userKey = this.getUserKey(username);
    localStorage.setItem(userKey,JSON.stringify(user));
  }

  //To login a user who has entered valid credentials and has their credentials stored in the storage.
  login(username:string,password:string):boolean{
    const userKey = this.getUserKey(username);
    const storedUser = localStorage.getItem(userKey);

    if(storedUser){
      const user = JSON.parse(storedUser);
      if (user.username === username && user.password === password){
        localStorage.setItem(userKey,JSON.stringify(user));
        return true;
      }
    }
    return false;
  }

  logout(){

    this.router.navigate(['/login'])
  }

  //To check user authentication and then return true or false.
  isAuthenticated(username:string):boolean{
    const userKey = this.getUserKey(username);
    return !!localStorage.getItem(userKey);
  }

  //To get username and password of current user
  getCurrentUser(username:string):any{
    const userKey = this.getUserKey(username);
    const storedUser = localStorage.getItem(userKey);
    return storedUser?JSON.parse(storedUser):null;
  }

}
