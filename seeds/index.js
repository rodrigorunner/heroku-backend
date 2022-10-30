const { users } = require('./seedsHelpers')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(`MongoDB connected on host ${mongoose.connection.host}`))
.catch(err => console.log(err 
    ))

const UserSchema = new Schema({
    name: String,
    username: String,
    email: String,
    city: String,
    zipcode: String,
    website: String

}, {
    timestramp: new Date().toLocaleDateString()
})

const User = mongoose.model('User', UserSchema)

const seedsDB = async () => {
    await User.deleteMany({})
    for(let i = 0; i < users.length; i++) {
        // console.log(users[i])
        const usersEl = new User({
            name: `${users[i].name}`,
            usename: `${users[i].username}`,
            email: `${users[i].email}`,
            city: `${users[i].city}`,
            zipcode: `${users[i].zipcode}`,
            website: `${users[i].website}`,
        })
        const res = await usersEl.save()
        console.log(usersEl)
    }
}
seedsDB().then(() => mongoose.connection.close())

