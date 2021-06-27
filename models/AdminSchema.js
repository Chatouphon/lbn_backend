const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    firstName: {
        type: String,
        required: true,
        max: 255
    },
    lastName: {
        type: String,
        required: true,
        max: 255
    },
    image: {
        type: String,
        default: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light'
    },
}, { timestamps:true, collection: 'admin' })

const adminModel = mongoose.model('admin', adminSchema)
module.exports = adminModel