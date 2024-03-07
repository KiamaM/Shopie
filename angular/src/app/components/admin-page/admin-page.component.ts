import { Component } from '@angular/core';
import { ProductsTableComponent } from '../../products-table/products-table.component';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Users } from '../../../Interfaces/user.interface';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../search/search.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [ProductsTableComponent, RouterLink, RouterOutlet, RouterLinkActive, CommonModule , SearchComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {


  isSidebarOpen = false;
  isSearchDivVisible=false;
  searchInput: string = '';

  id!: string
  user!: Users
storedUser =''

  constructor(private router: Router,public authservice:AuthService) {

  }
  ngOnInit(): void {
    const storedUser = this.authservice.getStoredUser();
    if (storedUser) {
      this.authservice.setUser(storedUser);
      console.log("User details success",storedUser)
    }

  }
toggleSearchDiv(){
  this.isSearchDivVisible = !this.isSearchDivVisible;
}
performSearch(){
  // search logic
  console.log('Performing search for: ' + this.searchInput);
// search logic ends here

  this.searchInput = ''; //reseting input
    this.isSearchDivVisible = false;
}

toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
  
  setTimeout(() => {
    this.closeSidebar();
  }, 3000)
}
closeSidebar() {
  this.isSidebarOpen = false;
}
logout(){
  localStorage.clear()
  this.router.navigate([''])
}
}
