import Article from '../../models/Article';
import ArticleService from '../../services/article';
import mockingoose from 'mockingoose';
import mongoose from 'mongoose';

describe('article services tests', () => {

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

    beforeEach(() => {
        mockingoose.resetAll();
    });

    it('should return the article collection', async () => {
        mockingoose(Article).toReturn(articles, 'find');

        const result = await ArticleService.fetch();
        expect(result.length).toBe(articles.length);
    });

    it('should return the article with findById', async () => {

        mockingoose(Article).toReturn(articles[1], 'findOne');// findById is findOne

        const result = await ArticleService.find(articles[1]._id);
        expect(result?.author).toBe(articles[1].author);
    });

    it('should return the article created', () => {
        const newArticle = {
            title: 'NewTitle',
            author: 'NewAuthor',
            body: 'NewBody'
        }
        mockingoose(Article).toReturn(newArticle, 'save');

        ArticleService.create(newArticle).then(res => {
            expect(res.title).toBe(newArticle.title);
        });
    });

    it('should return the article updated', async() => {
        const articleUpdated = {
            title: 'TitleUpdated',
            author: 'AuthorUpdated',
            body: 'BodyUpdated'
        }

        mockingoose(Article).toReturn(articleUpdated, 'findOneAndUpdate');
        const result = await ArticleService.update(articles[0]._id, articleUpdated);
        expect(result?.author).toBe(articleUpdated.author); 
    });

    it('should return the article removed', async() => {
        mockingoose(Article).toReturn(articles[0], 'findOneAndRemove');
        
        const result = await ArticleService.remove(articles[0]._id);
        expect(result?.author).toBe(articles[0].author);
    });

})