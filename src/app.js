import config from './config'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import routes from './routes'
import cors from 'cors'
import middlewares from './middlewares'
import { connect } from 'mongoose'

connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const { name } = require('../package.json')
const basePath = `/${name}/api/`

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../public')))

app.use(middlewares.addVersion)

app.use(basePath, routes)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message
  })
})

export { app, basePath }
