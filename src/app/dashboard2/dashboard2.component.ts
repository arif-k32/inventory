import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpServiceService } from '../services/http-service.service';
import { formatCurrency } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map, of } from 'rxjs';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss']
})
export class Dashboard2Component implements OnInit {
  productsObservable$!:any;

  


  productsForm:FormGroup = new FormGroup ({});
  newproduct:FormGroup = new FormGroup ({
        name: new FormControl ('', Validators.required),
        price: new FormControl ('',[Validators.required, Validators.min(0)]),
        stock: new FormControl('',[Validators.required, Validators.min(0)]),
        sku:new FormControl('',Validators.required),
        active: new FormControl(false,Validators.required)
  })


  filterFn:Function[]=[
       
        (products:any)=>{    ///filter by active
              let filteredProducts:any[]=[]
              if(this.filters[this.active])
                filteredProducts=products.filter((product:any)=>product.active.toString() === this.filters[this.active]);
              else
                filteredProducts=products;
              return filteredProducts;
        },

        (products:any)=>{     ///filter by stock
              let filteredProducts:any[]=[];
              if(this.filters[this.stock])
                  if(this.filters[this.stock] =='0')
                    filteredProducts=products.filter((product:any)=> product.stock == 0)
                  else
                    filteredProducts = products.filter((product:any)=> product.stock > 0)
              else
                filteredProducts=products;
              return filteredProducts;
        },
  ]

    
  
  filters=['','']
  active=0;
  stock=1;

  constructor(private http:HttpServiceService, private toastr:ToastrService, private htprq:HttpClient){}

  setfiltersActive(activeDropdown:any){
    this.filters[this.active]=activeDropdown.target.value;
    this.getdata();
  }
  setfiltersStock(stockDropdown:any){
    this.filters[this.stock]=stockDropdown.target.value;
    this.getdata();
  }

  newproductf(){
    console.log(this.newproduct.valid)
    if(this.newproduct.valid)
            this.http.createProduct(this.newproduct.value).subscribe((res)=>{
                                  this.newproduct.reset();
                                  this.newproduct.get('active')?.setValue(false)
                                  this.getdata();
                                })
    else
        this.toastr.error(`Product not valid`,'error',{
                      timeOut:3000,
                      progressBar:true,
                      progressAnimation:'decreasing',
                      positionClass:'toast-bottom-right',
                      closeButton:true
                    })
  }


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
            this.showtoast('deleted')
            this.http.getProducts().subscribe((response:any)=>{
              this.productsObservable$=of(response)
            })
          })  
  }

  getdata(){
    this.productsObservable$= this.http.getProducts().pipe(map((products:any)=>{ return this.checkfilters(products)}));
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

  checkfilters(products:any){
    for(const filter of this.filterFn)
      products=filter(products)
    return products;
  }


  updateProduct(product:any){
      const updatedProduct = {
                          ...product,
                          price:this.getNumberFromText(this.productsForm.controls[product.id].value.price),
                          stock:this.productsForm.controls[product.id].value.stock
                        }


      this.http.updateProduct(product.id,updatedProduct).subscribe(response=>{
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
