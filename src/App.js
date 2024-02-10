import express from "express";
import productRouter from "./routes/productsRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products");

app.listen(8080, () => console.log("Escuchando en 8080"));
