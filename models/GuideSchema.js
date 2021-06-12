const mongoose = require('mongoose')

const Schema = mongoose.Schema

const guideSchema = new Schema({
    title: String,
    content: String,
    cover: String,
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null }
})

const GuideModel = mongoose.model('guide', guideSchema)
module.exports = GuideModel