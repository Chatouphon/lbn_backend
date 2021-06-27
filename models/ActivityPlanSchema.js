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
}, { timestamps:true, collection: 'activity'})

const ActivityPlanModel = mongoose.model('activity', activityPlanSchema)
module.exports = ActivityPlanModel
