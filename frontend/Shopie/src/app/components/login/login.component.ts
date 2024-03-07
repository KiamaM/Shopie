import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMsg!: string
  successMsg!: string

  msgVisible = false
  msgVisible2 = false

  loginForm!: FormGroup

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    public userService: UserService
  ) {

    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]]
    })
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.userService.loginUser(this.loginForm.value).subscribe(
        (res: any) => {
  console.log('Login Response:', res);
          if (res.error) {
            this.msgVisible = true
            this.errorMsg = res.error

            setTimeout(() => {
              this.msgVisible = false
            }, 3000);
          } else {
            this.msgVisible2 = true
            this.successMsg = res.message
            localStorage.setItem('token', res.token)
            this.userService.setUser(res);
            // const firstName = res.firstName;
            // console.log(firstName)
            setTimeout(() => {
              if (res?.role?.toLowerCase() == 'admin') {
                this.router.navigate(['admin/dashboard']);
              } else {
                this.router.navigate([`user`]);
              }
            }, 3000);
            
          }
        })
    }
  }
}
