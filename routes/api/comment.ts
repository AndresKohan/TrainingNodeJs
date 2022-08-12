import { Router } from "express";
import CommentController from "../../controllers/comment";


const commentApi = (router: Router) => {
    router.get('/', CommentController.findByArticleId);
    router.get('/:id', CommentController.find);
    router.post('/', CommentController.create);
    router.put('/:id', CommentController.update);
    router.delete('/:id', CommentController.remove);
    return router;
};

export default commentApi;