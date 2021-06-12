const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bloodGroupSchema = new Schema({
    ABO: {
        type: String,
        enum : ['A', 'B', 'O', 'AB'],
        default: 'A'
    },
    rhesus: {
        type: String,
        enum : ['Positive', 'Negative'],
        default: 'Positive'
    },
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null }
})

const BloodGroupModel = mongoose.model('bloodgroup', bloodGroupSchema)
module.exports = BloodGroupModel
