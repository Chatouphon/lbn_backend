const express = require('express')
const adminModel = require('../models/AdminSchema')
const router = express.Router()

router.get('/', async (req, res, next) => {
    const admins = await questionModel.find()
    res.json({status:200, admins: admin})
})

router.get('/:admin_id', async (req, res, next) => {
    const admin_id = req.params.admin_id
    const admin = await adminModel.findById(admin_id)
    res.json({status: 200, admin: admin})
})

router.post('/', async (req, res, next) => {
    const payload = req.body
    const admin = new adminModel(payload)
    admin.created_at = Date.now()
    await admin.save()
    res.json({status: 200, admin: admin})
})

router.patch('/:admin_id', async (req, res, next) => {
    const admin_id = req.params.admin_id
    const payload = req.body
    const admin = await adminModel.findByIdAndUpdate(admin_id, {$set: payload})
    res.json({status: 200, edited: admin})
})

router.delete('/:admin_id', async (req, res, next) => {
    const admin_id = req.params.admin_id
    await adminModel.findByIdAndDelete(admin_id)
    res.json({status: 200})
})

module.exports = router;