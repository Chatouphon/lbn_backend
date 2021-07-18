const express = require("express");
const DonationModel = require("../models/DonationSchema");
const ActivityPlanModel = require("../models/ActivityPlanSchema");
const router = express.Router();
const gauth = require("./vertifyIdToken");

router.get("/", gauth, async (req, res, next) => {
  try {
    const donorId = req.userGoogle['sub'] 
    const records = await DonationModel.find({ donorId: donorId }).populate("activityId");
    // console.log(records)
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

router.get("/:donor_id", (req, res, next) => {});

router.post("/add", gauth, async (req, res, next) => {
  try {
    const donorId = req.userGoogle["sub"];
    let verifyCode = req.body.verifyCode;
    // console.log(verifyCode);
    let timeCurr = new Date();
    let h = checkTime(timeCurr.getHours());
    let m = checkTime(timeCurr.getMinutes());
    let HHMM = h + ":" + m;
    let today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10);
    let checkCode = await ActivityPlanModel.findOne({ verifyCode: verifyCode });
    if (!checkCode) {
      return res.json({
        alert: true,
        message: "ລະຫັດທີ່ທ່ານປ້ອນ ແມ່ນບໍ່ຖືກຕ້ອງ",
      });
    }
    console.log(checkCode._id);
    let donationExist = await DonationModel.findOne({
      donorId: donorId,
      activityId: checkCode._id,
    });
    if (donationExist != null) {
      return res.json({
        alert: true,
        message: "ທ່ານໄດ້ ບັນທຶກການເຂົ້າຮ່ວມແລ້ວ",
      });
    }
    const activity = await ActivityPlanModel.findOne({
      verifyCode: verifyCode,
      dateAt: { $all: [today] },
      timeStart: { $lt: HHMM },
      timeEnd: { $gte: HHMM },
    });
    if (!activity) {
      return res.json({
        alert: true,
        message: "ລະຫັດ ຂອງທ່ານແມ່ນໝົດອາຍຸ ຫຼື ຍັງບໍ່ທັນເປີດນຳໃຊ້",
      });
    }
    const donation = {
      activityId: activity._id,
      donorId: donorId,
      dateDonor: today,
    };
    const recordDonor = new DonationModel(donation);
    await recordDonor.save();
    return res.status(201).json({
      alert: false,
      message: "ບັນທຶກການຮ່ວມບໍລິຈາກສຳລັບ",
    });
  } catch (error) {}
});

router.put("/", (req, res, next) => {
  res.json({ status: 200 });
});

router.delete("/", (req, res, next) => {
  res.json({ status: 200 });
});

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

module.exports = router;
