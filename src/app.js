import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import routes from './routes'
import cors from 'cors'
const { name, version } = require('../package.json')
const basePath = `/${name}/api/${version}`

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../public')))

app.use(basePath, routes)

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).render('error', {
    message: err.message
  })
})

export { app, basePath }
