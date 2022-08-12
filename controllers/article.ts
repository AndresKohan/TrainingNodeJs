import { NextFunction, Request, Response } from 'express';
import ArticleService from '../services/article';
import CommentService from '../services/comment';


//const articleService = new ArticleService();
//const commentService = new CommentService();

export default class ArticleController {

    static async fetch(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(await ArticleService.fetch());
        } catch (err) {
            next(err);
        }
    }

    static async find(req: Request, res: Response, next: NextFunction)   {
        try {
            res.json(await ArticleService.find(req.params.id));
        } catch (err) {
            next(err);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(201).json(await ArticleService.create(req.body.article));
        } catch (err) {
            next(err);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).json(await ArticleService.update(req.params.id, req.body.article));
        } catch (err) {
            next(err);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            await CommentService.removeByArticleId(req.params.id);
            await ArticleService.remove(req.params.id);
            res.status(200).json('The article and comments associated was removed successfully')
        } catch (err) {
            next(err);
        }
    }
}