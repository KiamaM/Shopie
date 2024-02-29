import { Request, Response } from "express"
import { v4 } from "uuid"
import Connection from "../dbHelper/dbhelper"
import { products } from "../Interfaces/product.interface"




//Create a new instance of the dbhelper class
const dbhelper = new Connection


export const createProduct = async (req:Request, res:Response)=>{
    try {
       const id = v4()
   
       const{productName,description, category, stockQuantity,regularPrice,salePrice, image}:products = req.body
   
   
       let result = await (dbhelper.execute('createProduct', {
        productId:id, productName,description, category, stockQuantity,regularPrice,salePrice, image
       }))
   
       if(result.rowsAffected[0] > 1){
           return res.json({
               error:'Product creation failed'
           })
       }else{
           
       return res.json({
           message:'Product added successfully',
           messages:result.recordset
   
       })
       }
   
    } catch (error:any) {
       return res.json({
           error:error.originalError.info.message
       })
    }
   }


   export const getProducts = async(req:Request, res:Response)=>{
    try {

        let products = (await (dbhelper.execute('getAllProducts'))).recordset


        return res.json({
            products: products
        })
    } catch (error:any) {
        return res.json({
            error:error.originalError.info.message
        })
    }
}

export const getOneProduct = async(req:Request, res:Response)=>{
    try {
        const id = req.params?.['id']

        let product = (await dbhelper.execute("getOneProduct", {productId:id})).recordset


        return res.json({
            product
        })
    } catch (error) {
        return res.json(error)
    }
}

export const deleteProduct = async(req:Request, res: Response)=>{
    try {
        const productId:any = req.params?.['id']

        const result = await dbhelper.execute("deleteProduct",{productId})

        

        return res.status(200).json({
            message: "Product deleted successfully"
        })


    } catch (error) {
        return res.status(500).json({ 
            error: "Internal Server Error" 
        });
    }
}

export const updateProduct = async(req:Request, res: Response)=>{
    try {
        const id = req.params?.['id']

        const{productId,productName, description, category, stockQuantity,regularPrice,salePrice, image}:products = req.body

        const result = await dbhelper.execute("updateProduct", {
            productId : id,
            productName:productName,
            description : description,
            category : category,
            stockQuantity : stockQuantity,
            regularPrice : regularPrice,
            salePrice : salePrice,
            image : image 
        })

        console.log(result);
        

        return res.status(200).json({
            message: "Product details updated successfully"
        })


    } catch (error) {
        return res.status(500).json({ 
            error: "Internal Server Error" 
        });
    }
}