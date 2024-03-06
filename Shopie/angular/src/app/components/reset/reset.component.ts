import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export class ResetComponent {
  constructor(private route: Router) { }
  email: string = ''
  newPassword: string = ''
  successMsg: string = ''
  showSuccessMsg: boolean = false

  resetPassword() {
    // this.authService.resetPassword(this.email, this.newPassword).subscribe(
    //   (res) => {
    //     console.log('Password reset successful:', res.message);
    //     this.successMsg =res.message
    //     setTimeout(() => {
    //       this.showSuccessMsg = true
    //       this.router.navigate(['/login']);
    //     }, 2000);

    //     // this.resetForm.resetForm();
    //   },
    //   (error) => {
    //     console.error('Error resetting password:', error.error);
    //     // display an error message
    //   }
    // );
  }
}
