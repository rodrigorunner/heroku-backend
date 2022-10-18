const { handleError } = require('./middleware/userMiddleware')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(morgan('dev'))

connectDB()

// Configurar middleware para tratar requisição POST
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Configurar rota default da aplicação.
app.use('/api/v1/', require('./routes/userRoutes'))

app.use(handleError)

app.listen(port, () => console.log(`App listening on port ${port}`))