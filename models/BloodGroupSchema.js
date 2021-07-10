const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bloodGroupSchema = new Schema({
    ABO: {
        type: String,
        required: true
    }
}, { timestamps:true, collection: 'blood_group' })

const BloodGroupModel = mongoose.model('bloodgroup', bloodGroupSchema)
module.exports = BloodGroupModel
