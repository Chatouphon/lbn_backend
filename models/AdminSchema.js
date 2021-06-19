const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    username: String,
    password: String,
    email: String,
    fullName: String,
    image: String,
}, { timestamps:true, collection: 'admin' })

const adminModel = mongoose.model('admin', adminSchema)
module.exports = adminModel