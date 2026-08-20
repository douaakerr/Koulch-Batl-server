import { Router } from "express";
import Product from "../v1/product.js";
import users from "./users.js";
import category from "./category.js";
import newsletter from "./newsLetter.js";
import upload from "../../middleware/upload.js";
import { uploadImage } from "../../controllers/uploadImage.js";

const router = Router();

router.use("/products", Product);
router.use("/users", users);
router.use("/category", category);
router.use("/newsletter", newsletter);
router.post("/profile-image", upload.single("profileImage"), uploadImage);

export default router;
