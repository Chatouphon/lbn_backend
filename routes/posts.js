const express = require('express')
const PostModel = require('../models/PostSchema')
const router = express.Router()
const verify = require('./verifyToken')

router.get('/read', async (req, res, next) => {
    const posts = await PostModel.find({ statusPost: true }).sort("-createdAt")
    res.status(200).json({
        notice: {
            success: true,
            message: "ເຂົ້າເຖີງຂໍ້ມູນສຳເລັດ",
        },
        data: posts
    })
})

router.get('/read/admin', async (req, res, next) => {
    const posts = await PostModel.find().sort("-createdAt")
    res.status(200).json({
        notice: {
            success: true,
            message: "ເຂົ້າເຖີງຂໍ້ມູນສຳເລັດ",
        },
        data: posts
    })
})

router.get('/read/:post_id', async (req, res, next) => {
    const post_id = req.params.post_id
    const post = await PostModel.findById(post_id)
    res.status(200).json({
        notice: {
            success: true,
            message: "ເຂົ້າເຖີງຂ່າວສຳເລັດ",
        },
        data: post
    })
})

router.post('/add', verify ,async (req, res, next) => {
    try {
        const payload = req.body
        const post = new PostModel(payload)
        await post.save()
        res.status(200).json({
            notice: {
                success: true,
                message: 'ບັນທຶກສຳເລັດ',
            },
            data: post
        })
    } catch (error) {
        res.status(400).json({
            message: 'ບັນທຶກບໍ່ສຳເລັດ',
        })
        console.log(error)
    }
    // const payload = req.body
    // const post = new PostModel(payload)
    // await post.save()
    // res.json({status: 200})
})

router.patch('/update/:post_id', verify , async (req, res, next) => {
    const payload = req.body
    const post_id = req.params.post_id
    const post = await PostModel.findByIdAndUpdate(post_id, {$set: payload})
    res.status(200).json({
        notice: {
            success: true,
            message: 'ແກ້ໄຂໂພສສຳເລັດ',
        },
        data: post
    })
})

router.delete('/delete/:post_id', verify , async (req, res, next) => {
    const post_id = req.params.post_id
    await PostModel.findByIdAndDelete(post_id)
    // res.json({status: 200})
    res.status(200).json({
        notice: {
            success: true,
            message: 'ລົບໂພສສຳເລັດ',
        }
    })
})

module.exports = router