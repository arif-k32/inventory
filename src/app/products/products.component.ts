import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '../services/http-service.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  constructor(public route:ActivatedRoute, private httpservice:HttpServiceService){}

  product:any;
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      const id= params['id'];
      this.httpservice.getSingleProduct(id).subscribe((respose)=>{
          this.product=respose;
          console.log(respose)
      })
    })
  }


}