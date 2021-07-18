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
        default: 'https://firebasestorage.googleapis.com/v0/b/nodewithfirebase-6e669.appspot.com/o/public%2Fuser.png?alt=media&token=a4899652-fb95-4139-8dc4-18cefeb732e6'
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
