const clubRouter = require('./club/club.router')
const express = require('express')
const { authenticate } = require('./middleware')
const admin = require('firebase-admin')
const serviceAccount = require('./firebase-credentials.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(authenticate)
app.use('/club', clubRouter)

module.exports = app