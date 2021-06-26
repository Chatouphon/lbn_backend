const mongoose = require('mongoose')

const Schema = mongoose.Schema

const addressSchema = new Schema({
    addressName: String,
    latitude: String,
    longtitude: String,
}, { timestamps:true, collection: 'address' })

const AddressModel = mongoose.model('address', addressSchema)
module.exports = AddressModel