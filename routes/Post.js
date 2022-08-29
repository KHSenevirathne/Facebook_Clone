const express = require('express')
const app = express()
const router = express.Router()
const Post = require('../models/post.models')

app.use(express.json())

router.post('/', async (req, res) => {
    const post = new Post({
        userId: req.body.userId,
        date: req.body.date,
        time: req.body.time,
        title: req.body.title,
        body: req.body.body
    })

    try {
        const response = await post.save()
        res.json(response)
    } catch (e) {
        res.send("Err : " + e)
    }
})

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (e) {
        res.send("Err : " + e)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        post.userId = req.body.userId
        post.date = req.body.date
        post.time = req.body.time
        post.title = req.body.title
        post.body = req.body.body

        const response = await post.save()

        res.json(response)
    } catch (e) {
        res.send("Err : " + e)
    }
})

router.delete('/', async (req, res) => {
    try {
        const post = await Post.findByIdAndRemove(req.query.id)
        res.json(post)
    } catch (e) {
        res.send("Err : " + e)
    }
})

router.get('/get/:userId', async (req, res) => {
    try {
        const posts = await Post.find({"userId" : req.params.userId})
        res.json(posts)
    } catch (e) {
        res.send("Err : " + e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post)
    } catch (e) {
        res.send("Err : " + e)
    }
})
module.exports = router