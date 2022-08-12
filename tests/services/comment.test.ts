import mockingoose from "mockingoose";
import mongoose from "mongoose";
import Comment from "../../models/Comment";
import CommentService from "../../services/comment"

describe('comment services test', () => {

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

    it('should return the comment collection', async () => {
        mockingoose(Comment).toReturn(comments, 'find');

        const result = await CommentService.fetch();
        expect(result.length).toBe(comments.length);
    });

    it('should return the comment with findById', async () => {
        mockingoose(Comment).toReturn(comments[1], 'findOne');// findById is findOne

        const result = await CommentService.find(comments[1]._id);
        expect(result?.author).toBe(comments[1].author);
    });

    it('should return the comment with findByArticleId', async () => {
        mockingoose(Comment).toReturn([comments[1]], 'find');

        const result = await CommentService.findByArticleId(comments[1]?.article?._id);
        expect(result[0].author).toBe(comments[1].author);
    });

    it('Should return the commment created', async() => {
        const newComment = {
            title: 'NewTitle',
            author: 'NewAuthor',
            body: 'NewBody',
        }
        mockingoose(Comment).toReturn(newComment, 'save');

        CommentService.create(newComment).then(result => {
            expect(result.author).toBe(newComment.author);
        })
    })

    it('should return the comment updated', async() => {
        const commentUpdated = {
            title: 'TitleUpdated',
            author: 'AuthorUpdated',
            body: 'BodyUpdated',
        }

        mockingoose(Comment).toReturn(commentUpdated, 'findOneAndUpdate');
        const result = await CommentService.update(comments[0]._id, commentUpdated);
        expect(result?.author).toBe(commentUpdated.author)
    });

    it('should return the comment removed', async() => {
        mockingoose(Comment).toReturn(comments[0], 'findOneAndRemove');

        const result = await CommentService.remove(comments[0]._id);
        expect(result?.author).toBe(comments[0].author)
    });

    it('should return the comment removed by articleId', async() => {
        mockingoose(Comment).toReturn([comments[0]], 'deleteMany');

        const result = await CommentService.removeByArticleId(comments[0].article._id);
        expect(result[0].author).toBe(comments[0].author)
    });
})