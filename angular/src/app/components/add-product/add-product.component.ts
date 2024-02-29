import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
productForm!:FormGroup
successMsg:string =''
showSuccessMessage:boolean =false

constructor(private router:Router, private fb:FormBuilder){
  // this.productForm = this.fb.group({
  //   tourType: ['', [Validators.required]],
  //   image: ['', [Validators.required]],
  //   destination: ['', [Validators.required]],
  //   description: ['', [Validators.required]],
  //   price: ['', [Validators.required]],
  //   startDate: ['', [Validators.required]],
  //   endDate: ['', [Validators.required]]
  // })
}

onSubmit(){
  // if(this.productForm.valid){
  //   this.tourservice.createTour(
  //     this.tourForm.value.tourType,
  //     this.tourForm.value.image,
  //     this.tourForm.value.destination,
  //     this.tourForm.value.description,
  //     this.tourForm.value.price,
  //     this.tourForm.value.startDate,
  //     this.tourForm.value.endDate)
  //     .subscribe((response) => {
  //       console.log(response);
  //     });

  //   this.successMsg = 'Tour successfully created';
  //   this.showSuccessMessage = true;

  //   this.tourForm.reset();

  //   setTimeout(() => {
  //     this.showSuccessMessage = false
  //   }, 2000);
  // } else {
  //   this.tourForm.markAllAsTouched();
  // }
}
}
