import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../Services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  productsArray:any[] = []
  totalPrice:any = 0  

  errorMsg!:string
  successMsg!:string

  emptyDisplay!:boolean

  visible = false
  visible2 = false

  user_id!: string

  cartItems:any[] =[]

  constructor(private cartService:CartService){
    this.getItemsInCart(this.user_id)
  }

  getItemsInCart(user_id:string){

    let newToken = localStorage.getItem('token') as string
    console.log(newToken);
    

    this.cartService.readToken(newToken).subscribe(res=>{
      console.log(res);

        this.visible2 = false
        console.log(res.info.user_id);            
        
        this.user_id = res.info.user_id

    this.cartService.getItemsInCart(this.user_id).subscribe(res=>{
      console.log(res);

      console.log(res.tours); 
      

      this.cartItems = res.tours
      
    })          

  })
}



  removeFromCart(id:string){

    this.cartService.removeFromCart(id).subscribe(res=>{
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

      this.getItemsInCart(id)
      }
    })
  }


}
