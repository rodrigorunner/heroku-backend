const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const getUser = asyncHandler(async (req, res) => {
    const user = await User.find({})

    res.status(200).json(user)
})

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user) {
        res.status(400)
        throw new Error('User does not exists.')
    }

    res.status(200).json(user)
})

const createUser = asyncHandler(async (req, res) => {
    if(!req.body.name || !req.body.username || !req.body.email || !req.body.website || !req.body.zipcode || !req.body.city) {
        res.status(400)
        throw new Error('Please, add a user.')
    }

    const createdUser = await User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        city: req.body.city,
        zipcode: req.body.zipcode,
        website: req.body.website,
    })

    res.status(200).json(createdUser)
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user) {
        res.status(400)
        throw new Error('User does not exists.')
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedUser)
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user) {
        res.status(400)
        throw new Error('Run does not exists.')
    }

    await user.remove()

    res.status(200).json({ id: req.params.id })
}) 

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}