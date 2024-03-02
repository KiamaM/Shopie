import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule, NavbarComponent],
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


  constructor(private formbuilder: FormBuilder, private router: Router) {

    this.registerForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]]
    })
  }

  registerUser() {

    if (this.registerForm.valid) {}

}}
