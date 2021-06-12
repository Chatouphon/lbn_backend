const mongoose = require('mongoose')

const Schema = mongoose.Schema

const activityPlanSchema = new Schema({
    addressId: String,
    title: String,
    content: String,
    image: String,
    status: String,
    timeStart: Date,
    timeEnd: Date,
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null }
})

const ActivityPlanModel = mongoose.model('activity', activityPlanSchema)
module.exports = ActivityPlanModel
