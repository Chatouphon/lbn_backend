const mongoose = require('')

const Schema = mongoose.Schema

const addressSchema = new Schema({
    addressName: String,
    latitude: String,
    longitude: String,
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null }
})

const AddressModel = mongoose.model('address', addressSchema)
module.exports = AddressModel