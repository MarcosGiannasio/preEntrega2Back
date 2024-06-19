import FileSystem from "../utils/FileSystem.js";

export default class ShoppingCartManager {
    #filename;
    #fileSystem;
    #shoppingCarts;

    constructor() {
        this.#filename = "shopping-carts.json";
        this.#fileSystem = new FileSystem(this.#filename);
        this.#shoppingCarts = [];
    }

    persist = async (shoppingCart) => {
        const shoppingCartRegistered = await this.readOneId(shoppingCart.id);

        if (shoppingCartRegistered) {
            shoppingCartRegistered.products = shoppingCart.products;
        } else {
            this.#shoppingCarts.push(shoppingCart);
        }

        await this.#fileSystem.write(this.#shoppingCarts);
    };

    readAll = async () => {
        this.#shoppingCarts = await this.#fileSystem.read() ?? [];
        return this.#shoppingCarts;
    };

    readOneId = async (id) => {
        this.readAll();
        const shoppingCart = this.#shoppingCarts.find((shoppingCart) => shoppingCart.id === Number(id));

        return shoppingCart;
    };


    
}