import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductServiceService } from '../../Services/product-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {

id!:string
product!:any

visible = false
visible2 = false

imageUpload:any[] = []
updateProductForm!:FormGroup
errorMsg!:string
successMsg!:string


imgUrl!: any 


  constructor(private fb:FormBuilder, private ProductService:ProductServiceService,private router:Router, private route:ActivatedRoute, private http:HttpClient){
  
    this.updateProductForm = this.fb.group({
      productName:['', [Validators.required]],
      description:['', [Validators.required]],
      category:['', [Validators.required]],
      stockQuantity:['', [Validators.required]],
      regularPrice:['', [Validators.required]],
      salePrice:['', [Validators.required]], 
      image:['', [Validators.required]], 
    })
    this.getProductId()

  }
  uploadImage(event: any): void{
        
    // const target = event.target
    // const files = target.files
    // if(files){
    //     const formData = new FormData()
    //     formData.append("file", files[0])
    //     formData.append("upload_preset", "shopieProductImageUploads")
    //     formData.append("cloud_name", "dioueb86u")
  
  
    //     formData.forEach((dataItem)=>{
    //       console.log(dataItem);
    //       console.log(dataItem);
    //       this.imageUpload.push(dataItem)
  
    //       console.log(this.imageUpload[0]);
          
    //       const image = this.imageUpload[0]
          
    //       this.http.post<any>('https://api.cloudinary.com/v1_1/dioueb86u/image/upload', {image}).subscribe(
    //         (res) => {
    //           this.imgUrl = res.url;
    //         },
    //         (error) => {
    //         }
    //       );
    //     })    
  
  
    // }
  
  }
  
  getProductId(){
    this.route.params.subscribe(res=>{
      console.log(res['productId']);
      this.id = res['productId']

      this.getProductDetails()
    })
  }

  getProductDetails(){
    this.ProductService.getOneProduct(this.id).subscribe(res=>{
      console.log(res);
      console.log(this.id);
      
      console.log(res.product[0]);
      this.product = res.product[0]   

      console.log(res.product[0]);   
      console.log(typeof(this.product.regularPrice));
         

      this.updateProductForm.get('productName')?.setValue(this.product.productName)
      this.updateProductForm.get('description')?.setValue(this.product.description)
      this.updateProductForm.get('category')?.setValue(this.product.category)
      this.updateProductForm.get('stockQuantity')?.setValue(this.product.stockQuantity)
      this.updateProductForm.get('regularPrice')?.setValue(this.product.regularPrice)
      this.updateProductForm.get('salePrice')?.setValue(this.product.salePrice)
      this.updateProductForm.get('image')?.setValue(this.product.image)

    })
  }

  updateProduct(){
    this.ProductService.updateProduct(this.id, this.updateProductForm.value).subscribe(res=>{
      console.log(res);

      // this.router.navigate(['/'])
      
    })
  }

}
