import { Router } from "express";
import ProductManager from "../managers/productManager.js"

const router = Router();
const manager = new ProductManager('./src/files/products.json');

router.get('/', async (req, res) => {
    const products = await manager.getAll();
    res.render('home', {products});
})

export default router;