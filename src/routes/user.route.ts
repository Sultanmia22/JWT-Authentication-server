import express from "express"
import { userController } from "../controllers/user.controller"

const router = express.Router()

// Create User Router 
router.post('/createuser',userController.createUser)

// Login User Router
router.post('/loginuser',userController.loginUser)


export const userRoute = router