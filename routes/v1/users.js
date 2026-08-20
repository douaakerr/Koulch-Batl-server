import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../../controllers/usersController.js";
const router = Router()

router.get('/all', getUsers)
router.get('/', getUser)
router.post('/', createUser)
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router