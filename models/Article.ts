import * as mongoose from "mongoose";

const Article = mongoose.model('Article', new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true }
}, {timestamps: true}));

export default Article;