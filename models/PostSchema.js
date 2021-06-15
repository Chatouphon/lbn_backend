const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: String,
    content: String,
    image: String,
    datePost: String,
    statusPost: Boolean,
    penname: String
}, { timestamps: true, collection: 'post' })

const PostModel = mongoose.model('post', postSchema)
module.exports = PostModel
