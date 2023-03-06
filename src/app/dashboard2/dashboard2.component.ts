import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpServiceService } from '../services/http-service.service';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss']
})
export class Dashboard2Component implements OnInit {
  productsObservable$!:any;

  editMode=false;
  editId!:string;


  productsForm:FormGroup = new FormGroup ({});


  constructor(private http:HttpServiceService, private toastr:ToastrService, private htprq:HttpClient){}


  switch(product:any, checkbox:any){
    if(checkbox.target.checked == true){
      this.productsForm.controls[product.id].get('price')?.enable();
      this.productsForm.controls[product.id].get('stock')?.enable();
      this.http.updateProductActive(product.id, true);

    }
    else{
      this.productsForm.controls[product.id].get('price')?.disable();
      this.productsForm.controls[product.id].get('stock')?.disable();
      this.http.updateProductActive(product.id, false);
    }
  }

  setPriceInputFieldOnChange(product:any ,event:any){
    const newvalue = this.getCurrencyFromNumber(this.getNumberFromText(event.target.value))
    this.productsForm.controls[product.id].get('price')?.setValue(newvalue)
    
  }

  delete(id:number){
    this.http.deleteProduct(id).subscribe(respose=>{
      console.log(respose)
      this.showtoast('deleted')
      this.getdata();
    })  
  }


  getdata(){
    this.productsObservable$= this.http.getProducts();
    
    this.productsObservable$.subscribe((resp:any)=>{
      resp.map((product:any)=>{
          this.productsForm.addControl(
            `${product.id}`, new FormGroup ({
                switch: new FormControl(product.active),
                price :new FormControl({value:this.getCurrencyFromNumber(product.price), disabled:!product.active},Validators.min(0)),
                stock : new FormControl({value:product.stock, disabled:!product.active},Validators.min(0))
            })
          )
      })
      
      
    })
    
  }

  
 

  updateProduct(product:any){
      const updatedProduct = {
                                ...product,
                                price:this.getNumberFromText(this.productsForm.controls[product.id].value.price),
                                stock:this.productsForm.controls[product.id].value.stock
                              }
      this.http.updateProduct(product.id,updatedProduct).subscribe(response=>{
        this.editMode=false;
        this.editId='';
        this.showtoast('update success');
        this.getdata();
    });
  }
  showtoast(message:string){
    this.toastr.success(`${message}`,'success',{
      timeOut:3000,
      progressBar:true,
      progressAnimation:'decreasing',
      positionClass:'toast-bottom-right',
      closeButton:true
    })
  }

  getNumberFromText(text:string){
    return Number(text.replace(/[^0-9.-]+/g,""));
  }
  getCurrencyFromNumber(value:any){
    return formatCurrency(value, 'en-US', '$')
  }

  checkIfProductUpdated(product:any){
    const { price, stock } = this.productsForm.controls[product.id].value;
    if( ! this.productsForm.controls[product.id].get('switch')?.value)
      return false;
    return !(this.getNumberFromText(price) == product.price && stock == product.stock);
  }


  updateEnableOrDisable(product:any){
    if(this.productsForm.controls[product.id].get('switch')?.value)
      if(this.checkIfProductUpdated(product))
         return false;
    return true;
    
  }
  ngOnInit(): void {
    this.getdata();
    
    
  }
  
}
