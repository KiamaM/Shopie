import { Request, Response } from "express";
import { orders } from "../Interfaces/orders.interface";
import Connection from "../dbHelper/dbhelper";
import { v4 } from "uuid"



const dbhelper = new Connection


export const addToCart = async(req:Request, res:Response)=>{
    try {
        const orderId = v4()

        const{userId,productId,orderedQuantity}:orders = req.body


        const result =  (await dbhelper.execute("makeAnOrder", {orderId,userId, productId, orderedQuantity})).rowsAffected

        console.log(result);
            
            return res.status(200).json({
                message: "Product added to cart"
            })



    } catch (error:any) {        
        return res.status(500).json({ 
            // error: "Internal Server Error" 
            error:error.message
        
        });
        
    }
}


export const removeFromCart = async(req:Request, res: Response)=>{
    try {
        const id = req.params?.['id']

        const{orderId, userId, productId, orderedQuantity} = req.body

        const result = await dbhelper.execute("cancelOrder", {
            orderId:id, 
            userId:userId, 
            productId:productId, 
            orderedQuantity:orderedQuantity
        })


        console.log(result);
        

        return res.status(200).json({
            message: "Item removed from cart"
        })


    } catch (error) {
        return res.status(500).json({ 
            error: "Internal Server Error" 
        });
    }
}

export const getItemsInCart = async(req:Request, res:Response)=>{
    try {

        const userId = req.params.id

        let allItems = (await (dbhelper.execute('getItemsInCart',{userId}))).recordset


        return res.json({
            allItems: allItems
        })
    } catch (error:any) {
        return res.json({
            error:error.originalError.info.message
        })
    }
}
