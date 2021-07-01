const mongoose = require('mongoose')

const Schema = mongoose.Schema

const activityPlanSchema = new Schema({
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
    },
    title: String,
    content: String,
    // image: String,
    status: Boolean,
    dateAt: Array,
    timeStart: String,
    timeEnd: String,
}, { timestamps:true, collection: 'activity'})

const ActivityPlanModel = mongoose.model('activity', activityPlanSchema)
module.exports = ActivityPlanModel
