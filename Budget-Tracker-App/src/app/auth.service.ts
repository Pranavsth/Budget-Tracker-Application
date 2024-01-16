import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public username:string;
  constructor(private router:Router) { }

   private getUserKey(username:string):string{
    return `user_${username}`;
  }

  userName(username:string){
    this.username=username;
  }
  register(username:string,password:string):void{
    const user={ username,password };
    const userKey = this.getUserKey(username);
    localStorage.setItem(userKey,JSON.stringify(user));
  }

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

  isAuthenticated(username:string):boolean{
    const userKey = this.getUserKey(username);
    return !!localStorage.getItem(userKey);
  }

  getCurrentUser(username:string):any{
    const userKey = this.getUserKey(username);
    const storedUser = localStorage.getItem(userKey);
    return storedUser?JSON.parse(storedUser):null;
  }

}
