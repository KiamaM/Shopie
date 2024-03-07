import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Users } from '../../intefaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  isSidebarOpen = false;
  isSearchDivVisible=false;
  searchInput: string = '';

  id!: string
  user!: Users

  constructor(private router: Router, private route: ActivatedRoute, public userService:UserService) {
    this.getUserId();
  }

getUserId() {
  this.route.params.subscribe(params => {
    console.log('Route Params:', params);
    this.id = params['userID'];
    console.log('User ID:', this.id);

    this.getUserDetails();
  });
}


getUserDetails() {
  this.userService.getOneUser(this.id).subscribe(res => {
    console.log(res.user[0].firstName);
    this.user = res.user[0];
  });
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
