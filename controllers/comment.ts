import { Request, Response, NextFunction } from "express";
import CommentService from "../services/comment";

//const commentService = new CommentService();

export default class CommentController {

    static async fetch(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(await CommentService.fetch());
        } catch (err) {
            next(err);
        }
    }
    static async find(req: Request, res: Response, next: NextFunction)   {
        try {
            res.json(await CommentService.find(req.params.id));
        } catch (err) {
            next(err);
        }
    }

    static async findByArticleId(req: Request, res: Response, next: NextFunction)   {
        try {
            const {article} = req.query;
            res.json(await CommentService.findByArticleId(article as string));
        } catch (err) {
            next(err);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(201).json(await CommentService.create(req.body.comment));
        } catch (err) {
            next(err);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).json(await CommentService.update(req.params.id, req.body.comment));
        } catch (err) {
            next(err);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).json(await CommentService.remove(req.params.id));
        } catch (err) {
            next(err);
        }
    }
}