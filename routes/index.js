import { Router } from "express";

import upload from "../middleware/upload.js";
import { uploadImage } from "../controllers/uploadimage.js";

const router = Router();

router.post(
  "/profile-image",
  upload.single("profileImage"),
  uploadImage
);

export default router;