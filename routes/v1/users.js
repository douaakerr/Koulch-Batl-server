import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../../controllers/usersController.js";
const router = Router()

// Get all users
router.get('/', getUsers)

//get user by id
router.get('/:id', getUser)

//create user
router.post('/', createUser)

//update user
router.put("/:id", updateUser);

//delete user
router.delete("/:id", deleteUser);

export default router