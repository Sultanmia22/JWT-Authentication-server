import express, { Request, Response } from 'express';
import { userRoute } from './user.route';
import { privateRoute } from './private.route';

const router = express.Router()

const moduleRoutes = [
    {
        path: "/users",
        route: userRoute
    },

    {
        path: "/private",
        route: privateRoute
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router