import { Router } from "express";
import Product from "../v1/product.js";
import users from "./users.js";
import category from "./category.js";
import newsletter from "./newsLetter.js";

const router = Router();

router.use("/products", Product);
router.use("/users", users);
router.use("/category", category);
router.use("/newsletter", newsletter);

export default router;
