const express = require("express");
const DonationModel = require("../models/DonationSchema");
const ActivityPlanModel = require("../models/ActivityPlanSchema");
const router = express.Router();
const gauth = require("./vertifyIdToken");

const { customAlphabet } = require("nanoid");
const alphabet = "0123456789";
const nanoid = customAlphabet(alphabet, 6);

router.get("/", gauth, async (req, res, next) => {
  try {
    const donorId = req.query.donorId;
    const records = await DonationModel.find({ donorId: donorId })
      .populate("activityId")
      .sort("-createdAt");
    // console.log(records)
    res.status(200).json({
      notice: {
        success: true,
        message: "ເຂົ້າເຖີງບັນທຶກການບໍລິຈາກສຳເລັດ",
      },
      data: records,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:donor_id", (req, res, next) => {});

router.post("/add", gauth, async (req, res, next) => {
  try {
    const donorId = req.body.donorId;
    let verifyCode = req.body.verifyCode;
    // console.log(verifyCode);
    // console.log(donorId)
    let timeCurr = new Date();
    let h = checkTime(timeCurr.getHours());
    let m = checkTime(timeCurr.getMinutes());
    let HHMM = h + ":" + m;
    let today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10);
    let checkCode = await ActivityPlanModel.findOne({ verifyCode: verifyCode });
    // console.log(checkCode)
    if (!checkCode) {
      return res.json({
        alert: true,
        message: "ລະຫັດທີ່ທ່ານປ້ອນ ແມ່ນບໍ່ຖືກຕ້ອງ",
      });
    }
    // console.log(checkCode._id);
    let donationExist = await DonationModel.findOne({
      donorId: donorId,
      activityId: checkCode._id,
    });
    if (donationExist != null && donationExist._id != "6108e7282726065274f9834e") {
      return res.json({
        alert: true,
        message: "ທ່ານໄດ້ ບັນທຶກການເຂົ້າຮ່ວມແລ້ວ",
      });
    }
    console.log(today);
    if (checkCode._id == "6108e7282726065274f9834e") {
      // console.log(checkCode.title);
      const activity = await ActivityPlanModel.findOne({
        _id: "6108e7282726065274f9834e",
        verifyCode: verifyCode,
        timeStart: { $lt: HHMM },
        timeEnd: { $gte: HHMM },
      });
      console.log(activity);
      let newNanoid = nanoid();
      await ActivityPlanModel.updateOne(
        { _id: "6108e7282726065274f9834e" },
        { $set: { verifyCode: newNanoid } }
      );
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
        message: "ບັນທຶກການຮ່ວມບໍລິຈາກທີ່ສູນເລືອດ ສຳເລັດ",
      });
    }
    const activity = await ActivityPlanModel.findOne({
      dateAt: { $all: [today] },
      verifyCode: verifyCode,
      timeStart: { $lt: HHMM },
      timeEnd: { $gte: HHMM },
    });
    console.log(activity);
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
