import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { Users } from '../../../Interfaces/user.interface';

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

  constructor(private router: Router, private route: ActivatedRoute, public authService: AuthService, ) {}

    ngOnInit(): void {
      const storedUser = this.authService.getStoredUser();
      if (storedUser) {
        this.authService.setUser(storedUser);
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