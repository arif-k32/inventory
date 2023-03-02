import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  url:string='https://63c61f6bdcdc478e15bb91a4.mockapi.io'
  constructor(private http:HttpClient, private router:Router) { }
  getSingleProduct(id:number){
    return this.http.get(`${this.url}/products/${id}`)
  }
  
  deleteProduct(id:number){
    return this.http.delete(`${this.url}/products/${id}`)
  }
  getdata(database:string){
    return this.http.get(`${this.url}/${database}`);
  }

  registerUser(registerform:FormGroup){
    return this.http.post(`${this.url}/users`, registerform.value)
  }
  updateProduct(id:string,details:any){
    return this.http.put(`${this.url}/products/${id}`,details)
  }
  
}
