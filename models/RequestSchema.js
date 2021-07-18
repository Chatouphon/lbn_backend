const mongoose = require('mongoose')

const Schema = mongoose.Schema

const requestSchema = new Schema({
    title: String,
    content: String,
    image: String,
    allowed: {
        type: Boolean,
        default: false
    },
    requestor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'donor'
    },
    bloodReq: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bloodgroup'
    }
}, { timestamps: true, collection: 'request'})

const RequestModel = mongoose.model('request', requestSchema)
module.exports = RequestModel
