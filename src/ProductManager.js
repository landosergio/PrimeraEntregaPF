import fs from "fs";

// -- DEFINICIÓN PRODUCT MANAGER --

class ProductManager {
  constructor(path) {
    this.products = ["init"];
    this.path = path;
  }

  static prodId = 1;

  async initializeProducts() {
    if (this.products[0] == "init") {
      if (fs.existsSync(this.path)) {
        this.products = JSON.parse(
          await fs.promises.readFile(this.path, "utf-8")
        );
        this.products[0] &&
          (ProductManager.prodId = this.products[this.products.length - 1].id);
      } else {
        this.products = [];
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      }
    }
  }

  async addProduct(prod) {
    await this.initializeProducts();
    if (
      !this.products.some((product) => product.code == prod.code) &&
      prod.title &&
      prod.description &&
      prod.price &&
      prod.thumbnail &&
      prod.stock
    ) {
      this.products[0] &&
        (ProductManager.prodId =
          this.products[this.products.length - 1].id + 1);
      prod.id = ProductManager.prodId;
      this.products.push(prod);
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      console.log(`Se agregó ${prod.title}`);
    } else {
      console.log("El producto ya existe.");
    }
  }

  async getProducts() {
    await this.initializeProducts();

    return this.products;
  }

  async getProductById(id, showProd = true) {
    await this.initializeProducts();

    let prod = this.products.find((product) => product.id == id);
    showProd && console.log(prod || "Producto no encontrado");
    return prod;
  }

  async updateProduct(
    id,
    { title, description, price, thumbnail, code, stock }
  ) {
    let prod = await this.getProductById(id, false);
    if (prod) {
      let index = this.products.indexOf(
        this.products.find((product) => product.id == id)
      );

      title && (prod.title = title);
      description && (prod.description = description);
      price && (prod.price = price);
      thumbnail && (prod.thumbnail = thumbnail);
      code && (prod.code = code);
      stock && (prod.stock = stock);

      this.products[index] = prod;

      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      console.log(`Se modificó ${prod.title}`);
    } else {
      console.log("Producto no encontrado");
    }
  }

  async deleteProduct(id) {
    let prod = await this.getProductById(id, false);
    if (prod) {
      let productsAux = this.products.filter((prod) => prod.id != id);
      this.products = productsAux;

      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      console.log(`Se eliminó ${prod.title}`);
    } else {
      console.log("Producto no encontrado");
    }
  }
}

export default ProductManager;
