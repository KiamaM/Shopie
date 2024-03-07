export interface products{

    products:[{
    productName:string
    description:string
    category:string
    stockQuantity:number
    regularPrice:number
    salePrice:number
    image:string
    }],

    errors:[]


}


export interface addProducts{
  productName:string
  description:string
  category:string
  stockQuantity:number
  regularPrice:number
  salePrice:number
  image:string
}

export interface filterProducts{
  productName:string
  description:string
  category:string
  stockQuantity:number
  regularPrice:number
  salePrice:number
  image:string
}



