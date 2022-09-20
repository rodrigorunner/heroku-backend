const { handleError } = require('./middleware/runMiddleware')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
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

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(handleError)

app.listen(port, () => console.log(`App listening on port ${port}`))