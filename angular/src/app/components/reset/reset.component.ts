import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../../../Services/user-service.service';
import {  resetUserPassword } from '../../../Interfaces/userInterface';
import { HttpClientModule } from '@angular/common/http';
 
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})

export class ResetComponent {
  constructor(private router:Router, public authService: UserServiceService) { }

  email: string = '';
  newPassword: string = '';
successMsg:string =''
showSuccessMsg:boolean =false
 
resetPassword(logins:resetUserPassword): void {
    this.authService.resetPassword(logins ).subscribe(
      (res) => {
        console.log('Password reset successful:', res.message);
        this.successMsg =res.message
        setTimeout(() => {
          this.showSuccessMsg = true
          this.router.navigate(['/login']);
        }, 2000);
 
        // this.resetForm.resetForm();
      },
      (error) => {
        console.error('Error resetting password:', error.error);
        // display an error message
      }
    );
  }
 
}