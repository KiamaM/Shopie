import { Pipe, PipeTransform } from '@angular/core';
import { filterProducts, products } from '../Interfaces/product.interface';
import { ProductServiceService } from '../Services/product-service.service';
import { HttpClient } from '@angular/common/http';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
  query!:string
  filteredProducts: filterProducts[] = [];
  allProducts:any

  constructor(private productsService:ProductServiceService, private http:HttpClient) { }


  transform(products:any, query:string): any {  
  
     this.allProducts = this.productsService.getAllProducts().subscribe(res=>{
      res.products.filter(
        productsList => productsList?.category.toLowerCase().includes(query.toLowerCase())  
      );
      return this.allProducts
    
    })    
  }

}
