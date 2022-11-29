const User = require('../models/userModel')
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')
const Joi = require('joi')

const getUser = async (req, res) => {
    const user = await User.find({})

    res.status(200).json(user)
}

const getUserById = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
})

const createUser = catchAsync(async (req, res) => {
    const racesSchema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().required(),
        city: Joi.string().required(),
        zipcode: Joi.string().required(),
        website: Joi.string().required(),
    }).required()

    const { error } = await racesSchema.validate(req.body)
    if(error) {
        const msg = error.details.map(el => el.message)
        throw new ExpressError(msg, 404)
    }
    const user = new User(req.body)
    await user.save()
})

const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedUser)
}

const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user) {
        res.status(400)
        throw new Error('Run does not exists.')
    }

    await user.remove()

    res.status(200).json({ id: req.params.id })
}

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}