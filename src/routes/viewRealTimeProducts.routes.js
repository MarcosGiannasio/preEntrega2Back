import { Router } from "express";
import ProductManager from "../managers/productManager.js"

const router = Router();
const manager = new ProductManager('./src/files/products.json');

router.get("/views", (req, res) => {
          const products =  manager.getAll();
          res.render("realtimeProducts", {products});
        })

export default router;