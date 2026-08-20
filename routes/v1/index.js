import { Router } from "express";
import Product from "../v1/product.js";
import users from './users.js';

const router = Router();

router.use("/products", Product);
router.use('/users',users)

export default router
