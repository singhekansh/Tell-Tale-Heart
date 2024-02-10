const clubRouter = require('./club/club.router')
const express = require('express')

const app = express()
app.use(express.json())

app.use('/club', clubRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})



module.exports = app