import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { IsloggedinService } from './isloggedin.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private isloggedService:IsloggedinService){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):  boolean {
    if(this.isloggedService.isloggedin)
      return false;
    return true;
  }
  
}
