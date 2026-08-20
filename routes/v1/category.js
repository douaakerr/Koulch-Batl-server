import { Router } from "express";

import {
  createcategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
 
} from "../../controllers/categoryController.js";

const router = Router();


router.post("/", createcategory);
router.get("/categories", getCategories);
router.get("/categories/:id", getCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);



export default router;