import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class UserDashboardComponent {
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
    this.id = params['user_id'];
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
logout(){
  localStorage.clear()
  this.router.navigate([''])
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
}
