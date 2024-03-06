import express, { NextFunction, Request, Response, json } from 'express'
import cors from 'cors'
import ordersRouter from './Routes/order.router'
import productRouter from './Routes/product.router'
import userRouter from './Routes/userRoutes'


const app = express()

app.use(cors())
app.use(json())



//My routes
app.use('/users', userRouter)
app.use('/auth', ordersRouter)
app.use('/products', productRouter)
app.use('/cart', ordersRouter)

app.use((error:Error, request:Request, response:Response, next:NextFunction)=>{
    response.json({
        message:error.message
    })
})


let port = 4500

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
    
})