const express = require('express')
const BloodGroupModel = require('../models/BloodGroupSchema')
const router = express.Router()

router.get('/', async (req, res) => {
    const bloodGroup = await BloodGroupModel.find()
    res.status(200).json({
        notice: {
            success: true,
            message: "ເຂົ້າເຖິງຂໍ້ມູນໝວດເລືອດສຳເລັດ",
        },
        data: bloodGroup
    })
})

router.get('/:bloodGroup_id', async (req, res) => {
    const bloodGroup_id = req.params.bloodGroup_id
    const bloodGroup = await BloodGroupModel.findById(bloodGroup_id)
    res.status(200).json({
        notice: {
            success: true,
            message: "ເຂົ້າເຖິງສຳເລັດ",
        },
        data: bloodGroup
    })
})

router.post('/', async (req, res) => {
    try {
        const payload = req.body
        const bloodGroup = new BloodGroupModel(payload)
        await bloodGroup.save()
        res.status(200).json({
            notice: {
                success: true,
                message: "ບັນທຶກສຳເລັດ"
            },
            data: bloodGroup
        })
    } catch (error) {
        res.status(400).json({
            err: error,
            message: "ບັນທຶກບໍ່ສຳເລັດ",
        })
        console.log(error)
    }
})

router.delete('/:bloodGroup_id', async (req, res) => {
    const bloodGroup_id = req.params.bloodGroup_id
    await BloodGroupModel.findByIdAndDelete(bloodGroup_id)
    res.status(200).json({
        notice: {
            success: true,
            message: "ລົບຂໍ້ມູນສຳເລັດ"
        }
    })
})

module.exports = router