const express = require('express')
const PostModel = require('../models/PostSchema')
const adminModel = require('../models/AdminSchema')
const router = express.Router()

router.get('/', async (req, res, next) => {
    const posts = await PostModel.find()
    res.json({status:200, data: posts})
})

router.get('/:post_id', async (req, res, next) => {
    const post_id = req.params.post_id
    const post = await PostModel.findById(post_id)
    res.json({status: 200, post: post})
})

router.post('/:', async (req, res, next) => {
    const payload = req.body
    const post = new PostModel(payload)
    await post.save()
    res.json({status: 200})
})

router.put('/:post_id', async (req, res, next) => {
    const payload = req.body
    const post_id = req.params.post_id
    const post = await await PostModel.findByIdAndUpdate(post_id, {$set: payload})
    res.json({status: 200, post: post})
})

router.delete('/post_id', async (req, res, next) => {
    const post_id = req.params.post_id
    await PostModel.findByIdAndDelete(post_id)
    res.json({status: 200})
})