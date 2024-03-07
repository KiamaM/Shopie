import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-wild-card',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './wild-card.component.html',
  styleUrl: './wild-card.component.css'
})
export class WildCardComponent {

}
