
import { Router } from "express";
import ShoppingCartManager from "../managers/ShoppingCartManager.js";

const router = Router();
const shoppingCartManager = new ShoppingCartManager();

router.get("/", async (req, res) => {
    const shoppingCarts = await shoppingCartManager.readAll();

    res.send({ shoppingCarts });
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const shoppingCarts = await shoppingCartManager.readAll();
    const shoppingCart = shoppingCarts.find((shoppingCart) => shoppingCart.id === Number(id));

    res.send({ shoppingCart });
});


router.post("/", async (req, res) => {
    const { id, id_product, amount, total } = req.body;
    const product = { id_product, amount, total };
    let shoppingCart = await shoppingCartManager.readOneId(id);

    if (shoppingCart) {
        shoppingCart.products.push(product);
    } else {
        shoppingCart = { id, products: [product] };
    }

    await shoppingCartManager.persist(shoppingCart);

    res.send({ status: true, shoppingCart });
});






export default router;
