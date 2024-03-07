export interface products{

    products:[{productName:string
    description:string
    category:string
    stockQuantity:number
    regularPrice:number
    salePrice:number
    image:string
    }],

    errors:[]


}

interface AllTours {

    tours :[{ destination:string
      category:string
      start_date:string
      end_date:string
      price:number}],

    errors:[]

  }