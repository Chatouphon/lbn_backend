const mongoose = require('mongoose')

const Schema = mongoose.Schema

const donorSchema = new Schema({
    donorId: String,
    name: String,
    surname: String,
    dob: String,
    gender: String,
    job: String,
    image: String,
    village: String,
    district: String,
    province: String,
    tel: Number,
    whatsapp: Number,
    bloodGroup: String,
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null }
})

const DonorModel = mongoose.model('donor', donorSchema)
module.exports = DonorModel
