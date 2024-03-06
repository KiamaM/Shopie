import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductServiceService } from '../../Services/product-service.service';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent {

  errorMsg!:string
  successMsg!:string

  emptyDisplay!:boolean

  visible = false
  visible2 = false


  id!:string

  user_id!:string



  product:any
  productTitle:string = 'New Oleato Golden FoamTM Iced Shaken Espresso with Toffeenut'
  price:string = 'Ksh 310'

  constructor(private productService:ProductServiceService,private cartService:CartService, private route:ActivatedRoute,private router:Router, private http:HttpClient){
    this.getProductId()
  }

  getProductId(){
    this.route.params.subscribe(res=>{
      console.log(res['productId']);
      this.id = res['productId']
      console.log(this.id);
      

      this.getProductDetails()
    })
  }

  getProductDetails(){
    this.productService.getOneProduct(this.id).subscribe(res=>{
      console.log(res);
      console.log(this.id);
      
      console.log(res.product[0]);
      this.product = res.product[0]   

      console.log(res.product[0]);   

    })
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
  
              this.router.navigate(['cart'])
            }
            
          })
  
      })

    }else{
      this.router.navigate(['login'])
    }

    }

}


