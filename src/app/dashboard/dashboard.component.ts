import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products!:any

  editMode=false;
  editId!:string;

  editName!:string;
  editPrice!:string;
  editStock!:string;

  inactiveRows:number[]=[];


  constructor(private http:HttpServiceService, private toastr:ToastrService){}

  enabledisable(productid:number, event:any){
    if(event.target.checked)
      this.inactiveRows.splice(this.inactiveRows.indexOf(productid),1)
    else
      this.inactiveRows.push(productid)
    console.log(this.inactiveRows)
  }

  delete(id:number){
    this.http.deleteProduct(id).subscribe(respose=>{
      console.log(respose, this.inactiveRows)
      this.getdata();
    })  
  }


  getdata(){
    this.http.getdata('products').subscribe(response=>{
      this.products=response;
    })
  }

  
  editRow(id:string){
    for (let product of this.products){
      if(product.id == id){
        this.editName = product.name;
        this.editPrice = product.price;
        this.editStock = product.stock;
        this.editMode=true;
        this.editId=id;
      }
    }
  }

  updateProduct(id:string){
    console.log('s')
    const details={
      "name":this.editName,
      "price":this.editPrice,
      "stock":this.editStock
    }
    this.http.updateProduct(id,details).subscribe(response=>{
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

  ngOnInit(): void {
    this.getdata();
    console.log(this.inactiveRows)
  }
  
}
