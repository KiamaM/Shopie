import { Component } from '@angular/core';
import { filterProducts } from '../../Interfaces/product.interface';
import { ProductServiceService } from '../../Services/product-service.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SearchPipe } from '../../Pipes/search.pipe';
import {  FormBuilder, FormGroup, ReactiveFormsModule,  } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive,RouterOutlet, SearchPipe, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  filteredProducts: any[] = [];
  filterForm!: FormGroup
  query!:string


  constructor(private productsService:ProductServiceService, private http:HttpClient, private fb : FormBuilder) {
    // this.getFilteredProducts()
    this.filterForm = this.fb.group({
      search: ['']
    })
  }

  

  getFilteredProducts(){
    if(this.filterForm.valid){
      this.query = this.filterForm.value.search
      console.log(this.filterForm.value.search)

    }
    // this.filter.get('search')
    // console.log(this.filterForm.get('search')?.value);
    
    // console.log(query);

    this.productsService.getAllProducts().subscribe(res=>{
      // console.log(res);
      
      this.filteredProducts = res.products.filter(
        productsList => productsList?.productName.toLowerCase().includes(this.query.toLowerCase())

      );

      console.log(this.filteredProducts);
      

    })
    
  }

  

}
