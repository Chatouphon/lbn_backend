const mongoose = require('mongoose')

const Schema = mongoose.Schema

const guideSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: String,
    cover: String,
}, { timestamps:true, collection: 'guide' })

const GuideModel = mongoose.model('guide', guideSchema)
module.exports = GuideModel