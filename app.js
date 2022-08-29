const express = require('express')
const mongoose = require('mongoose')

const user = require('./routes/User')
const post = require('./routes/Post')

const app = express()
const port = 4000

const url = 'mongodb://localhost/facebookClone';

mongoose.connect(url, {useNewUrlParser: true})
const con = mongoose.connection

con.on('open', () => {
    console.log("MongoDB Connected")
})

app.use(express.json())

app.use('/users', user)
app.use('/posts', post)

app.listen(port, () => {
    console.log(`app starting on ${port}`)
})
