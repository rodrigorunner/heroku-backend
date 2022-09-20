const express = require('express')
const router = express.Router()
const {
    getRun,
    getRunId,
    createRun,
    updateRun,
    deleteRun
} = require('../controller/runController')

router.route('/').get(getRun).post(createRun)
router.route('/:id').put(updateRun).delete(deleteRun).get(getRunId)

module.exports = router 