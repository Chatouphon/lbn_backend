const mongoose = require('mongoose')

const Schema = mongoose.Schema

const donorSchema = new Schema({
    donorId: String,
    name: String,
    surname: String,
    dob: String,
    gender: String,
    job: String,
    image: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/nodewithfirebase-6e669.appspot.com/o/public%2Fdefault-user.png?alt=media&token=4d7433a4-aa56-405c-aaa5-3dd2fc878be8'
    },
    village: String,
    district: String,
    province: String,
    tel: Number,
    whatsapp: Number,
    bloodGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bloodgroup'
    },
    // created_at: { type: Date, default: null },
    // updated_at: { type: Date, default: null },
    // deleted_at: { type: Date, default: null }
}, { timestamps:true, collection: 'donor'})

const DonorModel = mongoose.model('donor', donorSchema)
module.exports = DonorModel
