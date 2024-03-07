import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addProducts, products } from '../Interfaces/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }

  addProduct(product_details:addProducts){
    return this.http.post<{message:string, error:string}>('http://localhost:4500/products', product_details)

  }


  getAllProducts(){  

    return this.http.get<products>('http://localhost:4500/products') 

  
  }

  deleteProduct(product_id:string){
    console.log("Something");
    
    return this.http.delete<{message:string, error:string}>(`http://localhost:4500/products/${product_id}`, {

    })
  }

  getOneProduct(product_id:string){
    return this.http.get<{product:products[], message:string, error:string}>(`http://localhost:4500/products/${product_id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      })
    })
  }


  updateProduct(product_id:string, details:addProducts){
    return this.http.put<{message:string, error:string}>(`http://localhost:4500/products/${product_id}`, details
    )
  }


}
