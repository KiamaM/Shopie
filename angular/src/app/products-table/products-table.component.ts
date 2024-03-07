import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductServiceService } from '../../Services/product-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, CommonModule],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent {
  errorMsg!:string
  successMsg!:string

  visible = false
  visible2 = false
  imgUrl!:string

  clickDelete!:Boolean


  products:any[]=[]

  constructor(private productService:ProductServiceService,  private http:HttpClient, private router:Router){
    this.fetchProducts()
  }


  fetchProducts() {
    this.productService.getAllProducts().subscribe(res => {
      this.products = res.products;
    });
  

  }

  toConfirmDelete(){
    this.clickDelete = true
  }

  deleteProduct(id:string){


    this.productService.deleteProduct(id).subscribe(res=>{
      console.log(res);
      if(res.error){
        this.visible = true
        this.errorMsg = res.error
  
        setTimeout(() => {
          this.visible = false
        }, 3000);
      }else if(res.message){
        this.visible2 = true
        this.successMsg = res.message

        
  
        setTimeout(() => {
          this.visible2 = false
        }, 3000);

      this.fetchProducts()
      }
    })
  }
  




}
