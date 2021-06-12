const mongoose = require('mongoose')

const Schema = mongoose.Schema

const donationSchema = new Schema({
    donationId: String,
    activityId: String,
    donorId: String,
    dateDonor: date,
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null }
})

const DonationModel = mongoose.model('donation', donationSchema)
module.exports = DonationModel
