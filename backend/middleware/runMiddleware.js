const { stack } = require("../routes/runRoutes")

const handleError = (err, req, res, next) => {
    let statusCode = res.statusCode ? res.statusCode : 500
    
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : stack.err
    })
}

module.exports = {
    handleError
}