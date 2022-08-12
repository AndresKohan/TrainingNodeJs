import mockingoose from "mockingoose";
import mongoose from "mongoose";
import Comment from '../../models/Comment';
import CommentService from "../../services/comment";
import * as httpMocks from 'node-mocks-http';
import CommentController from "../../controllers/comment";

describe('Comment Controller Test', () =>{
    
    Comment.schema.path('article', Object);
    const comments = [
        {
            _id: new mongoose.Types.ObjectId().toString(),
            title: 'title1',
            author: 'author1',
            body: 'body1',
            article: {
                _id: new mongoose.Types.ObjectId().toString(),
                title: 'title1',
                author: 'author1',
                body: 'body1'
            },
        },
        {
            _id: new mongoose.Types.ObjectId().toString(),
            title: 'title2',
            author: 'author2',
            body: 'body2',
            article: {
                _id: new mongoose.Types.ObjectId().toString(),
                title: 'title2',
                author: 'author2',
                body: 'body2',
            },
        }
    ];

    beforeEach(() => {
        mockingoose.resetAll();
    });

    test('should fetch comments', async () => {
        CommentService.fetch = jest.fn().mockResolvedValue(comments);

        const mReq= httpMocks.createRequest()
        const mRes= httpMocks.createResponse();
        const mNext = jest.fn()

        await CommentController.fetch(mReq, mRes, mNext);

        const data = mRes._getJSONData();
        expect(CommentService.fetch).toHaveBeenCalledTimes(1);
        expect(mRes.statusCode).toBe(200);
        expect(data).toMatchObject(comments);
    })

    test('should find a comment by id', async () => {
        CommentService.find = jest.fn().mockResolvedValue(comments[0]);

        const mReq = httpMocks.createRequest({
            params: {
                id: comments[0]._id
            }
        });
        const mRes= httpMocks.createResponse();

        const mNext = jest.fn()

        await CommentController.find(mReq, mRes, mNext);

        const data = mRes._getJSONData();
        expect(CommentService.find).toHaveBeenCalledTimes(1);
        expect(CommentService.find).toHaveBeenCalledWith(comments[0]._id)
        expect(mRes.statusCode).toBe(200);
        expect(data).toMatchObject(comments[0]);
    })

    test('should find an comment by articleId', async () => {
        CommentService.findByArticleId = jest.fn().mockResolvedValue(comments[0]);

        const mReq = httpMocks.createRequest({
            query: {
                article: comments[0].article._id,
            }
        });
        const mRes= httpMocks.createResponse();

        const mNext = jest.fn()

        await CommentController.findByArticleId(mReq, mRes, mNext);

        const data = mRes._getJSONData();
        expect(CommentService.findByArticleId).toHaveBeenCalledTimes(1);
        expect(CommentService.findByArticleId).toHaveBeenCalledWith(comments[0].article._id)
        expect(mRes.statusCode).toBe(200);
        expect(data).toMatchObject(comments[0]);
    })

    test('should create a comment', async () => {
        const newComment = {comment:{
            title: 'title2',
            author: 'author2',
            body: 'body2',
            article: comments[0].article._id,
        }}
        CommentService.create = jest.fn().mockResolvedValue(newComment);

        const mReq = httpMocks.createRequest({
            body: newComment,
        });
        const mRes= httpMocks.createResponse();
        const mNext = jest.fn()

        await CommentController.create(mReq, mRes, mNext);

        const data = mRes._getJSONData();
        expect(CommentService.create).toHaveBeenCalledTimes(1);
        expect(CommentService.create).toHaveBeenCalledWith(mReq.body.comment);
        expect(mRes.statusCode).toBe(201);
        expect(data.comment.author).toBe(newComment.comment.author);
    })

    test('should update a comment', async () => {
        const commentUpdated = {comment:{
            title: 'title2',
            author: 'author2',
            body: 'body2',
            article: comments[0].article._id,
        }}
        CommentService.update = jest.fn().mockResolvedValue(commentUpdated);

        const mReq = httpMocks.createRequest({
            body: commentUpdated,
            params: {
                id: comments[0]._id
            }
        });
        const mRes= httpMocks.createResponse();
        const mNext = jest.fn()

        await CommentController.update(mReq, mRes, mNext);

        const data = mRes._getJSONData();
        expect(CommentService.update).toHaveBeenCalledTimes(1);
        expect(CommentService.update).toHaveBeenCalledWith(mReq.params.id, mReq.body.comment);
        expect(mRes.statusCode).toBe(200);
        expect(data.comment.author).toBe(commentUpdated.comment.author);
    });

    test('should remove a comment', async () => {
        CommentService.remove = jest.fn().mockResolvedValue(comments[0]);

        const mReq = httpMocks.createRequest({
            params: {
                id: comments[0]._id
            }
        });
        const mRes= httpMocks.createResponse();
        const mNext = jest.fn()

        await CommentController.remove(mReq, mRes, mNext);

        const data = mRes._getJSONData();
        expect(CommentService.remove).toHaveBeenCalledTimes(1);
        expect(CommentService.remove).toHaveBeenCalledWith(mReq.params.id);
        expect(mRes.statusCode).toBe(200);
    })
})