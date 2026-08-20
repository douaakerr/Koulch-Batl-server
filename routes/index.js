import { Router } from "express";

import upload from "../middleware/upload.js";
import { uploadImage } from "../controllers/uploadimage.js";
import v1 from "./v1/index.js";

const router = Router();

router.use("/v1",v1 );
router.post("/profile-image", upload.single("profileImage"), uploadImage);

export default router;
