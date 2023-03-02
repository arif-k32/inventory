import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private router:Router,private http:HttpServiceService){}
  registerform = new FormGroup({
      fname:new FormControl('',[Validators.required]),
      lname:new FormControl('',[Validators.required]),
      email:new FormControl('',[ Validators.required, Validators.email]),
      password:new FormControl('', Validators.required)
  })
 
  register(){
    this.http.registerUser(this.registerform).subscribe(respose=>{
      console.log(respose)
      this.router.navigate(['login'])
    })
  }
}
