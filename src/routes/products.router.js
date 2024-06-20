import {Router} from 'express';
import { ProductManager, productManager } from '../index.js';


const productsRouter = Router()

productsRouter.get('/', async(rec,res)=>{
    try{
        const {limit} = req.query;
        const products = productManager.getProducts()

        if (limit){
            const limitedProducts = products.slice(0, limit)
            return res.json(limitedProducts)
        }

        return res.json(products)

    } catch(error) {
        console.log(error)
        res.send('ERROR DE RECEPCIÓN')
    }
})

productsRouter.get('/:pdi', async(req,res)=> {
    try {
        const{pid} = req.params;
        const products = productManager.getProductsById(pid)
        res.json(products)
    } catch(error){
        res.send("ERROR DE RECEPCIÓN DEL ID ${pid}")
    }
})

productsRouter.post('/', async(req,res) => {
    try{
        const {title, description, price, thumbnail, code, stock, status, category} = req.body;

        const response = await productManager.addProduct({title, description, price, thumbnail, code, stock, status, category})

        res.json(response)

    } catch(error){
        console.log(error);
        res.send('error al agregar el producto :<')
    }
})

productsRouter.put('/:pid', async(req,res) => {
    const {pid} = req.params;

    try {
        const {title, description, price, thumbnail, code, stock, status, category} = req.body;  
        const response = await productManager.updateProduct(id, {title, description, price, thumbnail, code, stock, status, category})
        res.json(response)

    } catch (error) {
        console.log(error);
        res.send('error al cambiar información de producto con id ${pid}')
    }
})

productsRouter.delete('/:pid', async(req, res) => {
    const {pid} = req.params;
    
    try {
        await productManager.deleteProduct(id)
        res.send("Producto eliminado con éxito")
    } catch (error) {
        console.log(error);
        res.send('error al eliminar producto con id ${pid}')
    }
        
    }
)

export {productsRouter}
