import { Article } from "../models";

export default class ArticleService {

    static fetch() {
        return Article.find({}).lean().exec();
    }

    static find(id: string) {
        return Article.findById(id).lean().exec();
    }

    static create(article: any) {
        return Article.create(article);
    }

    static update(id: string, article: any) {
        return Article.findByIdAndUpdate(id, article).lean().exec();
    }

    static remove(id: string) {
        return Article.findByIdAndRemove(id).lean().exec();
    }
}