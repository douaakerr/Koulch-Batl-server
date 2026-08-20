import { Router } from "express";
import Product from "../v1/product.js";

const router = Router();

router.use("/products", Product);

export default router;
