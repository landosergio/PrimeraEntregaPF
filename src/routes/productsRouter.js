import { Router } from "express";

const productRouter = Router();
const manager = new ProductManager("./productos.json");

productRouter.get("/", async (req, res) => {
  let products = await manager.getProducts();
  let { limit } = req.query;
  let prodQuery = {};

  for (let i = 0; i < (limit || products.length); i++) {
    prodQuery[`Producto ${i + 1}`] = products[i];
  }

  res.send(prodQuery);
});

productRouter.get("/:pid", async (req, res) => {
  let product = await manager.getProductById(req.params.pid);

  res.send(product || "El producto no existe");
});

export default productRouter;
