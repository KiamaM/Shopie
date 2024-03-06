import { Component } from '@angular/core';
import { filterProducts } from '../../Interfaces/product.interface';
import { ProductServiceService } from '../../Services/product-service.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive,RouterOutlet],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  filteredProducts: filterProducts[] = [];

  query!:string


  constructor(private productsService:ProductServiceService, private http:HttpClient) {
    this.getFilteredProducts(this.query)
  }

  getFilteredProducts(query:string){
    this.productsService.getAllProducts().subscribe(res=>{
      res.products.filter(
        productsList => productsList?.category.toLowerCase().includes(query.toLowerCase())
      );
    })
  }

}
