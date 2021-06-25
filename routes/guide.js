const express = require('express')
const GuideModel = require('../models/GuideSchema')
const router = express.Router()
const verify = require('./verifyToken')

router.get('/', async (req, res, next) => {
    // console.log(req.user)
    const guides = await GuideModel.find()
    res.status(200).json({
        notice: {
            success: true,
            message: "ເຂົ້າເຖິງຄູ່ມືທັງໝົດສຳເລັດ",
        },
        data: guides
    })
})

router.get('/:guide_id', async (req, res, next) => {
    const guide_id = req.params.guide_id
    const guide = await GuideModel.findById(guide_id)
    res.status(200).json({
        notice: {
            success: true,
            message: "ເຂົ້າເຖິງຄູ່ມືສຳເລັດ",
        },
        data: guide
    })
})

// router.post('/add', verify , async (req, res, next) => {
router.post('/add', async (req, res, next) => {
    try {
        const payload = req.body
        const guide = new GuideModel(payload)
        console.log(payload)
        console.log(guide)
        await guide.save()
        res.status(200).json({
            notice: {
                success: true,
                message: "ບັນທຶກສຳເລັດ"
            },
            data: guide
        })
    } catch (error) {
        res.status(400).json({
            err: error,
            message: 'ບັນທຶກບໍ່ສຳເລັດ',
        })
        console.log(error)
    }
})

router.patch('/update/:guide_id', async (req, res, next) => {
// router.patch('/update/:guide_id', verify , async (req, res, next) => {
    const payload = req.body
    const guide_id = req.params.guide_id
    const guide = await GuideModel.findByIdAndUpdate(guide_id, {$set: payload})
    console.log(payload)
    console.log(guide)
    res.status(200).json({
        notice: {
            success: true,
            message: 'ແກ້ໄຂຄູ່ມືສຳເລັດ',
        },
        data: guide
    })
})

// router.delete('/delete/:guide_id', verify , async (req, res, next) => {
router.delete('/delete/:guide_id', async (req, res, next) => {
    const guide_id = req.params.guide_id
    await GuideModel.findByIdAndDelete(guide_id)
    res.status(200).json({
        notice: {
            success: true,
            message: 'ລົບຄູ່ມືສຳເລັດ'
        }
    })
})


module.exports = router