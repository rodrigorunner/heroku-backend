const ExpressError = require('./utils/ExpressError')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const ejs = require('ejs')
const engine = require('ejs-mate')
const app = express()
const session = require('express-session')

app.use(cors())
app.use(morgan('dev'))

connectDB()

// Configurar middleware para tratar requisição POST
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine)

const configCookie = {
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
}
app.use(session(configCookie))

// Configurar rota default da aplicação.
app.use('/api/v1/', require('./routes/userRoutes'))

app.get('/', (req, res) => {
    res.render('home')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    console.log(err)
    if(!err.message) err.message = 'Something went wrong'
    res.status(statusCode).render('error', { err })
})

app.listen(port, () => console.log(`App listening on port ${port}`))