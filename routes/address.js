const express = require('express')
const AddressModel = require('../models/addressSchema')
const router = express.Router()

router.get('/', async (req, res, next) => {
    const address = await AddressModel.find().sort("createdAt")
    res.status(200).json({
        notice: {
            success: true,
            message: "ເຂົ້າເຖິງຂໍ້ມູນສະຖານທີ່ສຳເລັດ",
        },
        data: address
    })
})

router.get('/:address_id', async (req, res, next) => {
    const address_id = req.params.address_id
    const address = await AddressModel.findById(address_id)
    res.status(200).json({
        notice: {
            success: true,
            message: "ເຂົ້າເຖິງສະຖານທີ່ສຳເລັດ",
        },
        data: address
    })
})

router.post('/add', async (req, res, next) => {
    try {
        console.log(req.body)
        const payload = req.body
        const address = new AddressModel(payload)
        await address.save()
        console.log(address)
        res.status(200).json({
            notice: {
                success: true,
                message: "ບັນທຶກສຳເລັດ",
            },
            data: address
        })
    } catch (error) {
        res.status(400).json({
            message: "ບັນທຶກບໍ່ສຳເລັດ",
        })
        console.log(error)
    }
})

router.patch('/edit/:address_id', async (req, res, next) => {
    const payload = req.body
    const address_id = req.params.address_id
    const address = await AddressModel.findByIdAndUpdate(address_id, {$set: payload})
    res.status(200).json({
        notice: {
            success: true,
            message: 'ແກ້ໄຂສະຖານທີ່ສຳເລັດ',
        },
        data: address
    })
})

router.delete('/delete/:address_id', async (req, res, next) => {
    const address_id = req.params.address_id
    await AddressModel.findByIdAndDelete(address_id)
    res.status(200).json({
        notice: {
            success: true,
            message: "ລົບໂພສສຳເລັດ"
        }
    })
})

module.exports = router