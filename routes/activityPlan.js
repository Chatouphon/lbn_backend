const express = require('express')
const ActivityPlanModel = require('../models/ActivityPlanSchema')
const router = express.Router()
const verify = require('./verifyToken')

const { customAlphabet } = require('nanoid');
const alphabet = '0123456789';
const nanoid = customAlphabet(alphabet, 6);

router.get('/', async (req, res, next) => {
    const activities = await ActivityPlanModel.find().sort("-createdAt").populate('addressId')
    res.status(200).json({
        notice: {
            success: true,
            message: "ເຂົ້າເຖິງຂໍ້ມູນກິດຈະກຳສຳເລັດ",
        },
        data: activities
    })
})

router.get('/calendar', async (req, res, next) => {
    const pickDate = req.query.pickDate
    // console.log(req)
    // console.log(pickDate)
    const activities = await ActivityPlanModel.find({ dateAt: { $all: [pickDate] } }).populate('addressId').sort("createdAt")
    // console.log(activities)
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
    const activity = await ActivityPlanModel.findById(activity_id).populate('addressId')
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
        let newNanoid
        let newVerifyCode
        do {
            newNanoid = nanoid()
            newVerifyCode = await ActivityPlanModel.findOne({ verifyCode: newNanoid })
        } while(!!newVerifyCode)
        payload['verifyCode'] = newNanoid
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
    // console.log(payload)
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