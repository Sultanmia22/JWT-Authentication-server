import express, { Request, Response } from 'express';
import { userRoute } from './user.route';

const router = express.Router()

const moduleRoutes = [
    {
        path: "/users",
        route: userRoute
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router