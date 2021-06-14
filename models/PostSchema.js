const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    postId: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String,
    image: String,
    datePost: Date,
    statusPost: String,
    penName: String
}, { timestamps: true, collection: 'post' })

const PostModel = mongoose.model('post', postSchema)
module.exports = PostModel
