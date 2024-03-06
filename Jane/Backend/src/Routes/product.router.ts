import { Router } from "express";
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "../Controllers/product.controller";


const productRouter = Router()

productRouter.post('/', createProduct)
productRouter.get('/',getProducts)
productRouter.get('/:id',getOneProduct)
productRouter.delete('/:id',deleteProduct)
productRouter.put('/:id',updateProduct)






export default productRouter