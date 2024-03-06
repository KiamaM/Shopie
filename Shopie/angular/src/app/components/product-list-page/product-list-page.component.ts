import { Component } from '@angular/core';
import { ProductServiceService } from '../../../Services/product-service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.css'
})
export class ProductListPageComponent {

  noProducts:Boolean = true


  imgUrl!:string
  errorMsg!:string
  successMsg!:string

  emptyDisplay!:boolean

  visible = false
  visible2 = false

  user_id!: string

  productsArray:any[] = []


  constructor(private productService:ProductServiceService,private cartService:CartService, private router:Router, private http:HttpClient){
    this.fetchProducts()
    this.noProducts = false
  }

  fetchProducts() {
    
    this.productService.getAllProducts().subscribe(res => {
      this.productsArray = res.products;
    });

  }

  
  addToCart(user_id:string, product_id:string){
    let newToken = localStorage.getItem('token') as string
    console.log(newToken);

    if(newToken){
      this.cartService.readToken(newToken).subscribe(res=>{
        console.log(res);
  
          this.visible2 = false
          console.log(res.info.user_id);            
          
          this.user_id = res.info.user_id
  
          this.cartService.addToCart(product_id, user_id).subscribe(res=>{
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
              this.router.navigate(['cart'])
            }
            
          })
  
      })

    }else{
      this.router.navigate(['login'])
    }

    }
}
