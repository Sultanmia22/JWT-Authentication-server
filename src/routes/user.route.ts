import express from "express"
import { userController } from "../controllers/user.controller"

const router = express.Router()

router.post('/createuser',userController.createUser)

export const userRoute = router