import { Comment } from "../models"

export default class CommentService {
    
    static fetch() {
        return Comment.find({}).populate('article').lean().exec();
    }

    static find(id: string) {
        return Comment.findById(id).populate('article').lean().exec();
    }

    static findByArticleId(id: string) {
        return Comment.find({article: id}).populate('article').lean().exec();
    }

    static create(newComment: any) {
        return Comment.create(newComment);
    }

    static update(id: string, commentUpdated: any) {
        return Comment.findByIdAndUpdate(id, commentUpdated).lean().exec();
    }

    static remove(id: string) {
        return Comment.findByIdAndRemove(id).lean().exec();
    }

    static removeByArticleId(articleId: string) {
        return Comment.deleteMany({article: articleId}).lean().exec();
    }
}