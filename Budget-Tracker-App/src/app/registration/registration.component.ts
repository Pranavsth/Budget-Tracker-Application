import { Component,OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  regForm: FormGroup;

  constructor(private authService:AuthService,private router:Router){}

  ngOnInit(){
    this.regForm=new FormGroup({
      firstname: new FormControl(null,Validators.required),
      lastname: new FormControl(null,Validators.required),
      email: new FormControl(null,[Validators.required,Validators.email]),
      username: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required),
      dob: new FormControl(null,Validators.required),
      address: new FormControl(null),
      city: new FormControl(null)
    });
  }

  onRegister(){
    console.log(this.regForm);
    this.authService.register(this.regForm.value.username,this.regForm.value.password)
    this.router.navigate(['/login']);
  }
}
