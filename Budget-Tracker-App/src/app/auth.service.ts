import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*This service is meant mainly for authentication and works with data service for authorization.
    Also, username and password are the main properties for validation and authentication.*/

  public username:string; //Made public to use across other services or components, if required, after user logs in.
  constructor(private router:Router) { }

  //Assigns a unique userKey to the user to store their credentials in the localStorage.
   private getUserKey(username:string):string{
    return `user_${username}`;
  }

  //To assign the username property of this service
  userName(username:string){
    this.username=username;
  }

  //To register a user with their username and password, and store it.
  register(username:string,password:string,rePassword:string):boolean{ //rePassword parameter here is re-entered password.
    const user={ username,password };
    const userKey = this.getUserKey(username);
    const storedUser = localStorage.getItem(userKey) //returns the user credentials matching the userKey.
    if(password===rePassword && password.length>=8){
    if(!storedUser){ //if username doesn't match with any of the existing usernames follow this logic.
      localStorage.setItem(userKey,JSON.stringify(user))
      return true;
    }
    else{
      alert('Username already exists');
      return false;
    }
  }
  else{
    if(password.length<8){
      alert('Password length must be atleast 8');
      return false;
    }
    else{
    alert('Passwords do not match!! Please check.')
    return false;
  }
  }
  }

  //To login a user who has entered valid credentials and has their credentials stored in the storage.
  login(username:string,password:string):boolean{
    const userKey = this.getUserKey(username);
    const storedUser = localStorage.getItem(userKey);

    if(storedUser){ //if username matches with existing user credential.
      const user = JSON.parse(storedUser);
      if (user.username === username && user.password === password){ //if user credentials are entered correctly, then follow this.
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
