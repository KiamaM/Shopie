import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductServiceService } from '../../Services/product-service.service';
import { AuthService } from '../../Services/auth.service';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, NavbarComponent],
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

  private isLocalStorageAvailable = typeof localStorage !== 'undefined';



  product:any
  productTitle:string = 'New Oleato Golden FoamTM Iced Shaken Espresso with Toffeenut'
  price:string = 'Ksh 310'

  constructor(private productService:ProductServiceService,private cartService:CartService, private authService:AuthService, private route:ActivatedRoute,private router:Router, private http:HttpClient){
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

  addToCart(){

    if (this.isLocalStorageAvailable) {

      const authorized = this.authService.getStoredUser()

  
      if(authorized){   
            this.visible2 = false
            this.user_id = authorized.userID
            console.log(this.user_id);

                
            this.cartService.addToCart(this.user_id, this.id).subscribe(res=>{
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
    
  
      }else{
        this.router.navigate(['login'])
      }

    }



    }

}


