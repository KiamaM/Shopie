import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';


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
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';


  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    public authService: AuthService

  ) {

    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]]
    })
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe(
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

            // check everywhere you use locallStorage
            if (this.isLocalStorageAvailable) {
              localStorage.setItem('token', JSON.stringify(res.token))
              console.log(res.token);
              
              this.authService.setUser(res);
              setTimeout(() => {
                if (res?.role?.toLowerCase() == 'admin') {
                  this.router.navigate(['admin/dashboard']);
                } else {
                  this.router.navigate([`user`]);
                }
              }, 3000);
            }

            
          }
        })
    }
  }
}
