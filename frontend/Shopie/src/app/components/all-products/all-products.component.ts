import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent {
  // Assuming products is an array of your products
  products: any[] = [
    // your product data here
  ];

  // Pagination variables
  itemsPerPage: number = 5; // Set the number of items per page
  currentPage: number = 1;

  // Calculate total number of pages
  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  // Function to change the current page
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Function to navigate to the next page
  nextPage(): void {
    this.changePage(this.currentPage + 1);
  }

  // Function to navigate to the previous page
  prevPage(): void {
    this.changePage(this.currentPage - 1);
  }


  constructor(private route: Router) { }

  navigateToAddProd() {
    this.route.navigate(['add-product']);
  }


}
