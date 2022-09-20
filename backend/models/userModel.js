const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    email: {
        type: String,
        required: [true, 'Please, add a user.']
    },
    password: {
        type: Number,
        required: [true, 'Please, add a password']
    }
}, {
    timestamp: true
})

module.exports = mongoose.model('User', UserSchema)