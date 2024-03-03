import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  isSidebarOpen = false;
  isSearchDivVisible=false;
  searchInput: string = '';


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
}
