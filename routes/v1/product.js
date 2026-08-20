import { Router } from "express";
const router = Router();
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getMyProducts,
  getProductById,
  updateProduct,
} from "../../controllers/productControllers.js";

//get all products
router.get("/", getAllProducts);

//get my products
router.get("/my-products", getMyProducts);

//get product by id
router.get("/:id", getProductById);

//create product
router.post("/", createProduct);

//update product
router.put("/", updateProduct);

//delete product
router.delete("/", deleteProduct);

export default router;
