const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const tokenExtractor = require('./utils/token-extractor')
const config = require('./utils/config')
const morgan = require('morgan')

mongoose.connect(config.mongoUrl)
  .then(() => {
    console.log('conected to database')
  })
  .catch(err => {
    console.error(err)
  })

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(tokenExtractor)
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app,
  server,
}
