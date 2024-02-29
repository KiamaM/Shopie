import express, { NextFunction, Request, Response, json } from 'express'
import cors from 'cors'
import productRouter from './Routes/product.router'


const app = express()

app.use(cors())
app.use(json())



app.use('/products', productRouter)



app.use((error:Error, request:Request, response:Response, next:NextFunction)=>{
    response.json({
        message:error.message
    })
})

let port = 4500

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
    
})