import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm:FormGroup;
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(){
   this.loginForm = new FormGroup({
    username: new FormControl(null,[Validators.required]),
    password: new FormControl(null,Validators.required)
   });
  }
  onLogin(){
    console.log(this.loginForm);
    this.authService.userName(this.loginForm.value.username);
    const isAuthenticated=this.authService.login(this.loginForm.value.username,this.loginForm.value.password);
    if(isAuthenticated){
    this.router.navigate(['/dashboard']);
    }
    else{
      alert('Invalid login details');
    }
  }
}
