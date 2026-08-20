import { Router } from "express";

import {
  createNewsletter,
  getNewsletters,
  getNewsletter,
  updateNewsletter,
  deleteNewsletter,
} from "../../controllers/newslettercontroller.js";

const router = Router();


router.post("/", createNewsletter);
router.get("/newsletters", getNewsletters);
router.get("/newsletters/:id", getNewsletter);
router.put("/newsletters/:id", updateNewsletter);
router.delete("/newsletters/:id", deleteNewsletter);

export default router;