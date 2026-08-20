import { Router } from "express";
import { uploadImage } from "../controllers/uploadimage.js";
import upload from "../middleware/upload.js";
import usersRouter from './v1/index.js'

const router = Router();

router.use('/v1', v1)

router.post(
  "/profile-image",
  upload.single("profileImage"),
  uploadImage
);

export default router;