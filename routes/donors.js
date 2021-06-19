const express = require('express')
const DonorModel = require('../models/DonorSchema')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.json({status:200})
})

router.get('/:donor_id', (req, res, next) => {
    res.json({status: 200})
})

router.post('/', (req, res, next) => {
    res.json({status: 200})
})

router.put('/', (req, res, next) => {
    res.json({status: 200})
})

router.delete('/', (req, res, next) => {
    res.json({status: 200})
})

module.exports = router;