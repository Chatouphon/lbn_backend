const express = require('express')
const ActivityPlanModel = require('../models/ActivityPlanSchema')
const router = express.Router()
const verify = require('./verifyToken')

router.get('/', async (req, res, next) => {
    const activities = await ActivityPlanModel.find()
    res.status(200).json({
        notice: {
            success: true,
            message: "ເຂົ້າເຖິງຂໍ້ມູນກິດຈະກຳສຳເລັດ",
        },
        data: activities
    })
})

router.get('/:activity_id', async (req, res, next) => {
    const activity_id = req.params.activity_id
    const activity = await ActivityPlanModel.findById(activity_id)
    res.status(200).json({
        notice: {
            success: true,
            message: "ເຂົ້າເຖິງກິດຈະກຳສຳເລັດ",
        },
        data: activity
    })
})

router.post('/add', verify, async (req, res, next) => {
    try {
        const payload = req.body
        const activity = new ActivityPlanModel(payload)
        await activity.save()
        res.status(200).json({
            notice: {
                success: true,
                message: "ບັນທຶກສຳເລັດ",
            },
            data: activity
        })
    } catch (error) {
        res.status(400).json({
            message: "ບັນທຶກບໍ່ສຳເລັດ",
        })
        console.log(error)
    }
})

router.patch('/edit/:activity_id', verify, async (req, res, next) => {
    const payload = req.body
    const activity_id = req.params.activity_id
    const activity = await ActivityPlanModel.findByIdAndUpdate(activity_id, {$set: payload})
    res.status(200).json({
        notice: {
            success: true,
            message: 'ແກ້ໄຂກິດຈະກຳສຳເລັດ',
        },
        data: activity
    })
})

router.delete('/delete/:activity_id', verify, async (req, res, next) => {
    const activity_id = req.params.activity_id
    await ActivityPlanModel.findByIdAndDelete(activity_id)
    res.status(200).json({
        notice: {
            success: true,
            message: "ລົບໂພສສຳເລັດ"
        }
    })
})

module.exports = router