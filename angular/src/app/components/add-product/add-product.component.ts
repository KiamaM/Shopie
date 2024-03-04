import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  productForm!: FormGroup
  successMsg: string = ''
  showSuccessMessage: boolean = false

  constructor(private route: Router, private fb: FormBuilder) {

  }

  onSubmit() {

  }

  BackToDashboard(){
    this.route.navigate(['admin'])
  }

}
