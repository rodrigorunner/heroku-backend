const asyncHandler = require('express-async-handler')
const Run = require('../models/runModel')

const getRun = asyncHandler(async (req, res) => {
    const run = await Run.find({})

    res.status(200).json(run)
})

const getRunId = asyncHandler(async (req, res) => {
    const run = await Run.findById(req.params.id)

    if(!run) {
        res.status(400)
        throw new Error('Run does not exists.')
    }

    res.status(200).json(run)
})

const createRun = asyncHandler(async (req, res) => {
    if(!req.body.race || !req.body.time) {
        res.status(400)
        throw new Error('Please, add a field.')
    }

    const createdRun = await Run.create({
        race: req.body.race,
        time: req.body.time
    })

    res.status(200).json(createdRun)
})

const updateRun = asyncHandler(async (req, res) => {
    const run = await Run.findById(req.params.id)

    if(!run) {
        res.status(400)
        throw new Error('Run does not exists.')
    }

    const updatedRun = await Run.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedRun)
})

const deleteRun = asyncHandler(async (req, res) => {
    const run = await Run.findById(req.params.id)

    if(!run) {
        res.status(400)
        throw new Error('Run does not exists.')
    }

    await run.remove()

    res.status(200).json({ id: req.params.id })
}) 

module.exports = {
    getRun,
    getRunId,
    createRun,
    updateRun,
    deleteRun,
}