import { Router } from "express";
import { addToCart, removeFromCart } from "../controllers/orders.controller";

const ordersRouter = Router()


ordersRouter.post('/', addToCart)
ordersRouter.delete('/', removeFromCart)


export default ordersRouter