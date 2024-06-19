import { Router } from 'express';
import ProductManager from '../managers/productManager.js';
import uploader from '../utils/uploader.js';

const router = Router();
const productService = new ProductManager('src/files/products.json');

/* const generarId = () => {
    let mayorId = 0;

    products.forEach((productoNuevo) => {
        if (productoNuevo.pid > mayorId) {
            mayorId = productoNuevo.pid;
        }
    });

    return mayorId + 1;
}; */

// Mostrar todos los productos

router.get('/', async (req, res) => {
  let products = await productService.getAll();
  console.log(products)
  res.send(products);
})

// Buscar un producto por ID

router.get('/:pid', async (req, res) => {
  const pid = req.params.pid;
  if (isNaN(pid)) return res.status(400).send({ status: 'error', error: 'El parámetro debe ser un número' });
  const parsedPid = parseInt(pid);
  let products = await productService.getAll();
  let product = products.find(obj => obj.id === parsedPid);
  if (!product) return res.status(400).send({ status: 'error', error: `El producto con id: ${parsedPid} no existe` });
  res.send({ product });
})

// Cear producto

router.post('/', uploader.single('file'), async (req, res) => {
  let newProduct = req.body
  newProduct.thumbnail = req.file.path
  if (!newProduct.price || !newProduct.title || !newProduct.description || !newProduct.estado || !newProduct.stock || !newProduct.category ) 
    return res.status(400).send({ status: 'error', error: 'Faltan datos' })
  const savedProductId = await productService.save(newProduct);
  const savedProduct = await productService.getById(savedProductId);
  res.send({ status: 'success', message: `Producto creado con id: ${savedProductId}`, product: savedProduct });
})

// Actualizar un producto por id:
router.put('/:pid', uploader.single('file'), async (req, res) => {
  const pid = req.params.pid;
  if (isNaN(pid)) return res.status(400).send({ status: 'error', error: 'El parámetro debe ser un número' });
  const parsedPid = parseInt(pid);
  let products = await productService.getAll();
  let product = products.find(obj => obj.id === parsedPid);
  if (!product) return res.status(400).send({ status: 'error', error: `El producto con id: ${parsedPid} no existe` });
  let updatedProduct = req.body;
  updatedProduct.id = parsedPid;
  updatedProduct.thumbnail = req.file.path;
  if (!updatedProduct.title || !updatedProduct.price) return res.status(400).send({ status: 'error', error: 'Product name and price are required' })
  await productService.update(updatedProduct);
  const updatedProductFromDB = await productService.getById(parsedPid);
  res.send({ status: 'success', message: `Se actualizó el producto con id: ${parsedPid}`, product: updatedProductFromDB });
})

// Eliminar producto con ID
router.delete('/:pid', async (req, res) => {
  const pid = req.params.pid;
  if (isNaN(pid)) return res.status(400).send({ status: 'error', error: 'El parámetro debe ser un número' });
  const parsedPid = parseInt(pid);
  let products = await productService.getAll();
  let product = products.find(obj => obj.id === parsedPid);
  if (!product) return res.status(400).send({ status: 'error', error: `El producto con id: ${parsedPid} no existe` });
  await productService.deleteById(parsedPid);
  res.send({ status: 'success', message: `El producto con id: ${parsedPid} fue eliminado` });
})

export default router;