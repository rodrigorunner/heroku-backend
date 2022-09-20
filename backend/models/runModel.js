const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RunSchema = Schema({
    race: {
        type: String,
        required: [true, 'Please add a race name.']
    },
    time: {
        type: Number,
        required: [true, 'Please add a time.']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Run', RunSchema)