import * as mongoose from "mongoose";

const Comment = mongoose.model('Comment', new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true },
    article: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'}
}, {timestamps: true}))

export default Comment;