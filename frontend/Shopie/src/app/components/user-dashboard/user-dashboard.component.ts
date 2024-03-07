import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Users } from '../../intefaces/user.interface';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  isSearchDivVisible = false;
  searchInput: string = '';
  id!: string;
  user!: Users;
  // userName:string =''
  storedUser =''

  constructor(private router: Router, public userService: UserService) {}

    ngOnInit(): void {
      const storedUser = this.userService.getStoredUser();
      if (storedUser) {
      this.storedUser = storedUser
      }
    }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  toggleSearchDiv() {
    this.isSearchDivVisible = !this.isSearchDivVisible;
  }

  performSearch() {
    console.log('Performing search for: ' + this.searchInput);
    this.searchInput = ''; 
    this.isSearchDivVisible = false;
  }
}