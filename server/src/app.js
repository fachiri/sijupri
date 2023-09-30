const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const middlewares = require('./middlewares')
const controllers = require('./controllers')
const path = require('path')

const app = express()

app.use(morgan('dev'))
app.use(helmet({
  crossOriginResourcePolicy: false,
}))
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', controllers)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

module.exports = app