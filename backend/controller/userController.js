const { racesSchema } = require('../utils/validateForm')
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')
const User = require('../models/userModel')

const getUser = async (req, res) => {
    const user = await User.find({})

    res.status(200).json(user)
}

const getUserById = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
    res.redirect('/races')
})

const createUser = catchAsync(async (req, res) => {
    const { error } = racesSchema.validate(req.body)
    if(error) {
        const msg = error.details.map(el => el.message)
        throw new ExpressError(msg, 404)
    }

    const createdUser = await User.create(req.body)
    res.status(200).json(createdUser)
})

const updateUser = catchAsync(async (req, res) => {
    const { id } = req.params 
    
    if(!id) {
        throw new ExpressError('Invalid operation.', 404)
    }

    const updatedUser = await User.findByIdAndUpdate(id, {...req.body}, {new: true})
    res.status(200).json(updatedUser)
})

const deleteUser = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user) {
        throw new ExpressError('Invalid operation.', 404)
    }

    await user.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}