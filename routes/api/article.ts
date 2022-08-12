import { Router } from "express";
import ArticleController from "../../controllers/article";

const articlesApi = (router: Router) => {
    router.get('/', ArticleController.fetch);
    router.get('/:id', ArticleController.find);
    router.post('/', ArticleController.create);
    router.put('/:id', ArticleController.update);
    router.delete('/:id', ArticleController.remove);
    return router;
};

export default articlesApi;