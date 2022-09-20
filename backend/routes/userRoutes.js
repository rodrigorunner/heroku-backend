const express = require('express')
const router = express.Router()
const {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controller/userController')

router.route('/').get(getUser).post(createUser)
router.route('/:id').put(updateUser).delete(deleteUser).get(getUserById)

module.exports = router 