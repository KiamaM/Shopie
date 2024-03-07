import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserResponse, Users } from '../../intefaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, TitleCasePipe],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit {
  isSidebarOpen = false;
  isSearchDivVisible=false;
  searchInput: string = '';

  id!: string
  user!: Users
storedUser =''

  constructor(private router: Router,public userService:UserService) {

  }
  ngOnInit(): void {
    const storedUser = this.userService.getStoredUser();
    if (storedUser) {
      // this.userService.setUser(storedUser);
this.storedUser = storedUser
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
