const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: String,
    content: String,
    image: String,
    datePost: String,
    statusPost: Boolean,
    penName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
    },
}, { timestamps:true, collection: 'post' })

const PostModel = mongoose.model('post', postSchema)
module.exports = PostModel
