const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const middlewares = require('./middlewares')
const controllers = require('./controllers')

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Sujipri API',
  })
})

app.use('/api', controllers)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

module.exports = app