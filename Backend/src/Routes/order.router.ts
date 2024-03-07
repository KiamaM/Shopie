import { Router } from "express";
import { addToCart, removeFromCart } from "../Controllers/orders.controller";


const ordersRouter = Router()


ordersRouter.post('/', addToCart)
ordersRouter.delete('/', removeFromCart)


export default ordersRouter