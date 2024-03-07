import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule, NavbarComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  title = 'Join Shopie!!!'

  registerForm!: FormGroup
  errorMsg: string = ''
  msgVisible = false
  msgVisible2 = false
  successMsg: string = ''


  constructor(private formbuilder: FormBuilder, private router: Router, public userService:UserService) {

    this.registerForm = this.formbuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]]
    })
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.userService.signUpUser(this.registerForm.value).subscribe(
        (res) => {
          console.log(res);
          if (res.error) {
            this.msgVisible = true; 
            this.errorMsg = res.error;
          } else {
            this.msgVisible2 = true;
            this.successMsg = res.message;
            setTimeout(() => {
              this.router.navigateByUrl('/login');
            }, 2000);
            
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }}