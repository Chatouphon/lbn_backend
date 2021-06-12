const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    postId: String,
    title: String,
    content: String,
    image: String,
    datePost: Date,
    statusPost: String,
    penName: String,
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null }
})

const PostModel = mongoose.model('post', postSchema)
module.exports = PostModel
