import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductServiceService } from '../../../Services/product-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ ReactiveFormsModule,CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent{
  
imageUpload:any[] = []
productForm!:FormGroup
errorMsg!:string
successMsg!:string


imgUrl: string | null = null

visible = false
visible2 = false



constructor(private fb: FormBuilder, private productService:ProductServiceService, private router:Router, private http:HttpClient){
  

  this.productForm = fb.group({
    productName:['', [Validators.required]],
    description:['', [Validators.required]],
    category:['', [Validators.required]],
    stockQuantity:['', [Validators.required]],
    regularPrice:['', [Validators.required]],
    salePrice:['', [Validators.required]], 
    image:['', [Validators.required]], 
  }
  ) 

}

async uploadImage(event: any){
        
  const target = event.target
  const files = target.files
  if(files){
      console.log(files)
      const formData = new FormData()
      formData.append("file", files[0])
      formData.append("upload_preset", "shopieProductImageUploads")
      formData.append("cloud_name", "dioueb86u")


      // formData.forEach((dataItem)=>{
      //   console.log(dataItem);
      //   console.log(dataItem);
      //   this.imageUpload.push(dataItem)

        console.log(formData);
        
        
        
        await fetch('https://api.cloudinary.com/v1_1/dioueb86u/image/upload', {
          method: "POST",
          body: formData
        }).then(
          (res:any) => {
            
            return res.json()  
          },
          
        ).then(data=>{
          console.log("this is the URL",data.url);
          this.productForm.get('image')?.setValue(data.url)
          return data.url = this.imgUrl;
          
        }
        );
      // })    


  }

}



 addProduct(){
  console.log(this.productForm.value);
  


  const postedData =  this.productForm.value
  console.log("data sent",postedData);
     

  
  this.productService.addProduct(postedData).subscribe(
    res =>{
      console.log(res);  
      
      if(res.error){
        this.visible = true
        this.errorMsg = res.error

        setTimeout(() => {
          this.visible = false
        }, 3000);
      }else if(res.message){
        this.visible2 = true
        this.successMsg = res.message        

        setTimeout(() => {
          this.visible2 = false
        }, 3000);


    }
    
},
error=>{
  console.error(error);
})

  this.productForm.reset()

}  

}
