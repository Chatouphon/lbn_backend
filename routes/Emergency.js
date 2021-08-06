const { request } = require("express");
const express = require("express");
const EmergencyDonorModel = require("../models/EmergencyDonor");
const RequestModel = require("../models/RequestSchema");
const router = express.Router();
const gauth = require("./vertifyIdToken");

router.post("/emergency/add", gauth, async (req, res) => {
  try {
    const donorId = req.body.donorId;
    let verifyCode = req.body.verifyCode;
    console.log(verifyCode);
    console.log(donorId);
    // let timeCurr = new Date();
    // let h = checkTime(timeCurr.getHours());
    // let m = checkTime(timeCurr.getMinutes());
    // let HHMM = h + ":" + m;
    let today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10);
    let checkCode = await RequestModel.findOne({ verifyCode: verifyCode });
    console.log(checkCode);
    if (!checkCode) {
      return res.json({
        alert: true,
        message: "ລະຫັດທີ່ທ່ານປ້ອນ ແມ່ນບໍ່ຖືກຕ້ອງ",
      });
    }
    console.log(checkCode._id);
    let donationExist = await EmergencyDonorModel.findOne({
      donorId: donorId,
      requestId: checkCode._id,
    });
    if (donationExist != null) {
      return res.json({
        alert: true,
        message: "ທ່ານໄດ້ ບັນທຶກການເຂົ້າຮ່ວມແລ້ວ",
      });
    }
    // const activity = await RequestModel.findOne({
    //   verifyCode: verifyCode,
    //   dateAt: { $all: [today] },
    //   timeStart: { $lt: HHMM },
    //   timeEnd: { $gte: HHMM },
    // });
    if (!checkCode.allowed) {
      return res.json({
        alert: true,
        message: "ລະຫັດ ຂອງທ່ານແມ່ນໝົດອາຍຸ ຫຼື ຍັງບໍ່ທັນເປີດນຳໃຊ້",
      });
    }
    const donation = {
      requestId: checkCode._id,
      donorId: donorId,
      dateDonor: today,
    };
    const recordDonor = new EmergencyDonorModel(donation);
    await recordDonor.save();
    return res.status(201).json({
      alert: false,
      message: "ບັນທຶກການຮ່ວມບໍລິຈາກສຳເລັດ",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/emergency", gauth, async (req, res) => {
  try {
      const donorId = req.query.donorId
      const records = await EmergencyDonorModel.find({ donorId: donorId }).populate("requestId").sort("-createdAt");
    //   console.log(records)
      res.status(200).json({
        notice: {
          success: true,
          message: "ເຂົ້າເຖີງບັນທຶກການບໍລິຈາກສຳເລັດ",
        },
        data: records
      });
    } catch (error) {
      console.log(error);
    }
});

router.get('/helper', async (req, res) => {
  try {
    // console.log('hepler')
    const requestor = req.query.requestor
    console.log(requestor)
    const AllRequest = await RequestModel.find({ requestor: requestor })
    // let history = []
    const helper = []
    for (let requestItem in AllRequest) {
      // history.push(AllRequest[requestItem]._id) = 
      let person = await EmergencyDonorModel.find({ requestId: AllRequest[requestItem]._id }).populate("requestId donorId bloodGroup").sort("-createdAt")
      helper.push(person[0])
    }
    // console.log(history)
    // const helper = await EmergencyDonorModel.find({ requestId: { $all: history } }).populate("requestId donorId bloodGroup").sort("-createdAt")
    console.log(helper)
    return res.status(200).json({
      notice: {
        success: true,
        message: "ໄດ້ຂໍ້ມູນຜູ້ຊ່ວຍເຫຼືອສຳເລັດ"
      },
      data: helper
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
