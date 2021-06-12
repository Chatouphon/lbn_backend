const mongoose = require('mongoose')

const Schema = mongoose.Schema

const requestSchema = new Schema({
    requestId: String,
    donorId: String,
    dateDonor: Date,
    statusDonor: Date,
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null }
})

const RequestModel = mongoose.model('request', requestSchema)
module.exports = RequestModel
