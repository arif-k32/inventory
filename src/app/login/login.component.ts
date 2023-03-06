import { Component } from '@angular/core';
import{ FormGroup, FormControl,  Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { HttpServiceService } from '../services/http-service.service';
import { IsloggedinService } from '../services/isloggedin.service';
import { TokenstorageService } from '../services/tokenstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router:Router,private http:HttpServiceService,private isloggedinService:IsloggedinService, private tokenStorage:TokenstorageService){}
  
  loginform = new FormGroup({
      email:new FormControl('',[ Validators.required]),
      password:new FormControl('', Validators.required)
  })

  public get controls() {
    return this.loginform.controls;
  }
 
  login(){
    let users:any[];
    this.http.login(this.loginform).subscribe((response:any)=>{
                console.log(response)
                this.tokenStorage.accessToken=response.access_token;
                localStorage.setItem('access_token',JSON.stringify(response.access_token))
                this.router.navigate(['dashboard']);
          })
    
  }
}
