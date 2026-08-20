import { Router } from "express";
const router = Router();
import {
  createProduct,
  getAllProducts,
  getMyProducts,
  getProductById,
  updateProduct,
} from "../../controllers/productControllers.js";
import { deleteProduct } from "../../controllers/deleteProduct.js";

//get all products
router.get("/all", getAllProducts);

//get my products
router.get("/my-products", getMyProducts);

//get product by id
router.get("/:id", getProductById);

//create product
router.post("/create-product", createProduct);

//update product
router.put("/update-product/:id", updateProduct);

//delete product
router.delete("/delete-product/:id", deleteProduct);

export default router;
