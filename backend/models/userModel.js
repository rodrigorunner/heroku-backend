const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Invalid operation.']
    },
    username: {
        type: String,
        required: [true, 'Invalid operation.']
    },
    email: {
        type: String,
        required: [true, 'Invalid operation.']
    },
    city: String,
    zipcode: String,
    website: String

}, {
    timestramp: new Date().toLocaleDateString()
})

module.exports = mongoose.model('User', UserSchema)