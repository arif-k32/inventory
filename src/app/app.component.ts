import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IsloggedinService } from './services/isloggedin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'route';
  constructor(private router:Router,public isloggedinService:IsloggedinService){}


  logout(){
    if(this.isloggedinService.isloggedin){
      this.isloggedinService.isloggedin=false;
      this.router.navigate(['home'])
    }
  }
    


  
  
}
