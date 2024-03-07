import { Component } from '@angular/core';
import { ProductsTableComponent } from '../../products-table/products-table.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [ProductsTableComponent, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

}
