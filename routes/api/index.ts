import { Router } from "express";
import articlesApi from "./article";
import commentApi from "./comment";

const routes = (router: Router) => {
    router.use('/article', articlesApi(Router()));
    router.use('/comment', commentApi(Router()));
    return router;
}


export default routes;