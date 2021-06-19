const express = require('express')
const PostModel = require('../models/PostSchema')
// const adminModel = require('../models/AdminSchema')
const router = express.Router()

router.get('/read', async (req, res, next) => {
    const posts = await PostModel.find()
    res.status(200).json({
        notice: {
            success: true,
            message: "ເຂົ້າເຖີງຂໍ້ມູນສຳເລັດ",
        },
        data: posts
    })
})

router.get('/:post_id', async (req, res, next) => {
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

router.post('/add', async (req, res, next) => {
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

router.patch('/:post_id', async (req, res, next) => {
    console.log(req.body)
    const payload = req.body
    const post_id = req.params.post_id
    const post = await await PostModel.findByIdAndUpdate(post_id, {$set: payload})
    // res.json({status: 200, post: post})
    res.status(200).json({
        notice: {
            success: true,
            message: 'ບັນທຶກການແກ້ໄຂສຳເລັດ',
        }
    })
})

router.delete('/:post_id', async (req, res, next) => {
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