import { Router } from "express";
const router = Router()
import users from './users.js'


router.use('/users',users)

export default router