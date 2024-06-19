
import express from "express";
import path from "path";
import handlebars from "./config/handlebars.config.js";
import paths from "./utils/paths.js";
import productsRouter from "./routes/products.router.js"
import shoppingCartRouter from "./routes/shoppingCart.router.js"
import serverSocket from "./config/socket.config.js"
import ProductManager from "./managers/productManager.js";
import router from "./routes/shoppingCart.router.js";

const PORT = 8080
const HOST = "localhost"
const server = express();

const manager = new ProductManager('./src/files/products.json');


server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use("/api/public", express.static(paths.public));
server.use("/public", express.static(path.join(path.basename("src"),"public")));
server.use("/api/products", productsRouter);
server.use("/api/cart", shoppingCartRouter);



server.get("/views", (req, res) => {
  const products =  manager.getAll();
  res.render("realtimeProducts", {products});
})


handlebars.config(server);



// Oyente de solicitudes

const SHTTP = server.listen(PORT, () => {
  console.log(`Ejecutandose en http://${HOST}:${PORT}`);
})

serverSocket.config(SHTTP);


// Control de rutas inexistentes
server.use("*", (req, res) => {
  res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
});

// Control de errores internos
server.use((error, req, res) => {
  console.log("Error:", error.message);
  res.status(500).send("<h1>Error 500</h1><h3>Se ha generado un error en el servidor</h3>");
});

export default router

/* 
DEPLOY - INSTRUCCIONES:

1. Crear un repositorio de GitHub. Ej: mi-proyecto-backend
2. Subir el código al repositorio de GitHub
3. Crear una cuenta en Glitch.com
4. Crear un nuevo proyecto en Glitch.com a partir de GitHub
    -> Hacer clic en el botón "New Project"
    -> Hacer clic en el botón "Import from GutHub"
    -> Ingresar la URL del repositorio: https://github.com/serinformatico/mi-proyecto-backend.git
5. Esperar a que Glitch.com cree el proyecto (suele demorar)
6. Revisar el status y los logs
7. Finalmente, obtener el link haciendo clic en el botón "Share"

*/

// https://github.com/cuedefox/desafios-backend/blob/main/desafio-05-websockets-and-handlebars/src/routes/viewRealTimeProducts.routes.js