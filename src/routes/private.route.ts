import express from "express"
import { privateController } from "../controllers/private.controller"
import verifyToken from "../middleware/authMiddleware"

const router = express.Router()

router.get("/getPrivateData", verifyToken, privateController.privateData)

export const privateRoute = router