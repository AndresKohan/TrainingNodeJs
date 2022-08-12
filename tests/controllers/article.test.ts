
import mongoose from "mongoose";
import ArticleController from "../../controllers/article";
import ArticleService from "../../services/article";
import * as httpMocks from 'node-mocks-http';
import CommentService from "../../services/comment";

describe('Article Controller test', () =>{

    const articles = [
        {
            _id: new mongoose.Types.ObjectId().toString(),
            title: 'title1',
            author: 'author1',
            body: 'body1'
        },
        {
            _id: new mongoose.Types.ObjectId().toString(),
            title: 'title2',
            author: 'author2',
            body: 'body2'
        }
    ];

    afterEach(()=> {
        jest.resetAllMocks();
    });

    test('should fetch articles', async () => {
        ArticleService.fetch = jest.fn().mockResolvedValue(articles);

        const mReq= httpMocks.createRequest()
        const mRes= httpMocks.createResponse();
        const mNext = jest.fn()

        await ArticleController.fetch(mReq, mRes, mNext);

        const data = mRes._getJSONData();
        expect(ArticleService.fetch).toHaveBeenCalledTimes(1);
        expect(mRes.statusCode).toBe(200);
        expect(data).toMatchObject(articles);
    })

    test('should find an article by id', async () => {
        ArticleService.find = jest.fn().mockResolvedValue(articles[0]);

        const mReq = httpMocks.createRequest({
            params: {
                id: articles[0]._id
            }
        });
        const mRes= httpMocks.createResponse();

        const mNext = jest.fn()

        await ArticleController.find(mReq, mRes, mNext);

        const data = mRes._getJSONData();
        expect(ArticleService.find).toHaveBeenCalledTimes(1);
        expect(ArticleService.find).toHaveBeenCalledWith(articles[0]._id)
        expect(mRes.statusCode).toBe(200);
        expect(data).toMatchObject(articles[0]);
    })

    test('should create an article', async () => {
        const newArticle = { article: {
            title: 'newTitle',
            author: 'newAuthor',
            body: 'newBody'
        }};
        ArticleService.create = jest.fn().mockResolvedValue(newArticle);

        const mReq = httpMocks.createRequest({
            body: newArticle,
        });
        const mRes= httpMocks.createResponse();
        const mNext = jest.fn()

        await ArticleController.create(mReq, mRes, mNext);

        const data = mRes._getJSONData();
        expect(ArticleService.create).toHaveBeenCalledTimes(1);
        expect(ArticleService.create).toHaveBeenCalledWith(mReq.body.article);
        expect(mRes.statusCode).toBe(201);
        expect(data.article.author).toBe(newArticle.article.author);
    })

/*    test('should return a bad request', async () => {
        const newArticle = { article: {
            title: 'newTitle',
            author: 'newAuthor',
        }};
    
        ArticleService.create = jest.fn().mockRejectedValue(new Error());
        const mReq = httpMocks.createRequest({
            body: newArticle,
        });
        const mRes= httpMocks.createResponse();
        const mNext = jest.fn();

        expect(()=> {
            ArticleController.create(mReq, mRes, mNext);
        }).toThrow(new Error());
    })  */

    test('should update an article', async () => {
        const articleUpdated = { article: {
            title: 'titleUpdated',
            author: 'authorUpdated',
            body: 'bodyUpdated'
        }};
        ArticleService.update = jest.fn().mockResolvedValue(articleUpdated);

        const mReq = httpMocks.createRequest({
            body: articleUpdated,
            params: {
                id: articles[0]._id
            }
        });
        const mRes= httpMocks.createResponse();
        const mNext = jest.fn()

        await ArticleController.update(mReq, mRes, mNext);

        const data = mRes._getJSONData();
        expect(ArticleService.update).toHaveBeenCalledTimes(1);
        expect(ArticleService.update).toHaveBeenCalledWith(mReq.params.id, mReq.body.article);
        expect(mRes.statusCode).toBe(200);
        expect(data.article.author).toBe(articleUpdated.article.author);
    })

    test('should update an article', async () => {
        const articleUpdated = { article: {
            title: 'titleUpdated',
            author: 'authorUpdated',
            body: 'bodyUpdated'
        }};
        ArticleService.update = jest.fn().mockResolvedValue(articleUpdated);

        const mReq = httpMocks.createRequest({
            body: articleUpdated,
            params: {
                id: articles[0]._id
            }
        });
        const mRes= httpMocks.createResponse();
        const mNext = jest.fn()

        await ArticleController.update(mReq, mRes, mNext);

        const data = mRes._getJSONData();
        expect(ArticleService.update).toHaveBeenCalledTimes(1);
        expect(ArticleService.update).toHaveBeenCalledWith(mReq.params.id, mReq.body.article);
        expect(mRes.statusCode).toBe(200);
        expect(data.article.author).toBe(articleUpdated.article.author);
    })

    test('should remove an article and comments', async () => {
        CommentService.removeByArticleId = jest.fn().mockResolvedValue(articles[0]);
        ArticleService.remove = jest.fn().mockResolvedValue(articles[0]);

        const mReq = httpMocks.createRequest({
            params: {
                id: articles[0]._id
            }
        });
        const mRes= httpMocks.createResponse();
        const mNext = jest.fn()

        await ArticleController.remove(mReq, mRes, mNext);

        const data = mRes._getJSONData();
        expect(CommentService.removeByArticleId).toHaveBeenCalledTimes(1);
        expect(ArticleService.remove).toHaveBeenCalledTimes(1);
        expect(CommentService.removeByArticleId).toHaveBeenCalledWith(mReq.params.id);
        expect(ArticleService.remove).toHaveBeenCalledWith(mReq.params.id);
        expect(mRes.statusCode).toBe(200);
        expect(data).toBe('The article and comments associated was removed successfully');
    })
})