import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, NavbarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  currentroute = (this.route.snapshot.routeConfig?.path);
  token = localStorage.getItem('token') as string
  constructor(private router: Router, private route: ActivatedRoute) {

    if (this.currentroute == 'login') {
      if (this.token) {
        this.router.navigate([''])
      }
    }
  }
  title = "PIE"

  isMenuOpen = false;
  isLoggedIn = localStorage.getItem('token')

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigatetoLogin() {
    this.router.navigate(['login'])
  }

  navigatetoRegister() {
    this.router.navigate(['register'])
  }

  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }

}
