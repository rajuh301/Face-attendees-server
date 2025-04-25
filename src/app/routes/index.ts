import express from "express"
import { MeilisearchRoutes } from "../modules/Meilisearch/meilisearch.routes";
import { userRoutes } from "../modules/User/user.routes";


const router = express.Router();

const moduleRoutes = [
    {
        path: "/user",
        route: userRoutes
    },
   

    {
        path: '/search-items',
        route: MeilisearchRoutes,
    },
 
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;