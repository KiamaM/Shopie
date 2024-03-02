import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { products } from '../Interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private httpClient:HttpClient) { }

  getAllProducts(){

    return this.httpClient.get<products>('http://localhost:4500/products',) 

  
  }
}
