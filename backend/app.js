const clubRouter = require('./club/club.router')
const societyRouter = require('./society/society.router')
const proposalRouter = require('./proposal/proposal.router')
const express = require('express')
const { authenticate } = require('./middleware')
const admin = require('firebase-admin')
const serviceAccount = require('./firebase-credentials.json')
const morgan = require('morgan')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const app = express()
app.use(express.json())
app.use(morgan("dev"))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(authenticate)
app.use('/club', clubRouter)
app.use('/society', societyRouter)
app.use('/proposal', proposalRouter)

module.exports = app