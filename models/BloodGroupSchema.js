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
    }
}, { timestamps:true, collection: 'activity'})

const BloodGroupModel = mongoose.model('bloodgroup', bloodGroupSchema)
module.exports = BloodGroupModel
