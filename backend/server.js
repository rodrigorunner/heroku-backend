const { handleError } = require('./middleware/runMiddleware')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()

app.use(cors())

connectDB()

// Configurar middleware para tratar requisição POST
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Configurar rota default da aplicação.
app.use('/api/v1/', require('./routes/runRoutes'))

app.use(handleError)

app.listen(process.env.PORT || 5000, () => console.log(`App listening on port ${port}`))