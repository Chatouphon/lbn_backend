const { string } = require('@hapi/joi')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const donationSchema = new Schema({
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'activity'
    },
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'donor'
    },
    dateDonor: String,
}, {timestamps: true, collection: 'donation'})

const DonationModel = mongoose.model('donation', donationSchema)
module.exports = DonationModel
