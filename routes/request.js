const express = require("express");
const RequestModel = require("../models/RequestSchema");
const router = express.Router();
const gauth = require("./vertifyIdToken");
const verify = require("./verifyToken");

const { customAlphabet } = require("nanoid");
const alphabet = "0123456789";
const nanoid = customAlphabet(alphabet, 6);

router.get("/admin", verify, async (req, res) => {
  try {
    const AllRequest = await RequestModel.find()
      .populate("requestor bloodReq")
      .sort("-createdAt");
    return res.status(200).json({
      notice: {
        success: true,
        message: "ເຂົ້າເຖີງຂໍ້ມູນການຮ້ອງຂໍສຳເລັດ",
      },
      data: AllRequest,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/client", gauth, async (req, res) => {
  try {
    const donorId = req.query.donorId;
    const bloodGroup = req.query.bloodGroup;
    // console.log(donorId)
    // console.log(bloodGroup)
    const AllRequest = await RequestModel.find({
      requestor: { $ne: donorId },
      allowed: true,
      // bloodReq: bloodGroup,
    }).populate("requestor bloodReq").sort("-createdAt");
    // console.log(AllRequest)
    return res.status(200).json({
      notice: {
        success: true,
        message: "ເຂົ້າເຖີງຂໍ້ມູນການຮ້ອງຂໍສຳເລັດ"
      },
      data: AllRequest
    })
  } catch (error) {
    console.log(error);
  }
});

router.post("/add", gauth, async (req, res) => {
  try {
    const payload = req.body;
    let newNanoid;
    let newVerifyCode;
    do {
      newNanoid = nanoid();
      newVerifyCode = await RequestModel.findOne({
        verifyCode: newNanoid,
      });
    } while (!!newVerifyCode);
    payload["verifyCode"] = newNanoid;

    const newRequest = new RequestModel(payload);
    const getRequest = await newRequest.save();
    return res.status(201).json({
      notice: {
        success: true,
        message: "ບັນທຶກການຮ້ອງຂໍໃໝ່ສຳເລັດ",
      },
      data: getRequest,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/", gauth, async (req, res) => {
  try {
    const requestor = req.query.requestor;
    const MyRequset = await RequestModel.find({
      requestor: requestor,
    }).populate("bloodReq").sort("createdAt");
    return res.status(200).json({
      notice: {
        success: true,
        message: "ເຂົ້າເຖີງບັນທຶກການຮ້ອງຂໍສຳເລັດ",
      },
      data: MyRequset,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:request_id", async (req, res) => {
  try {
    const request_id = req.params.request_id;
    const currr_requset = await RequestModel.findOne({
      _id: request_id,
    }).populate("bloodReq");
    return res.status(200).json({
      notice: {
        success: true,
        message: "ດຶງຂໍ້ມູນຮ້ອງຂໍສຳເລັດ",
      },
      data: currr_requset,
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:requset_id", async (req, res) => {
  try {
    const request_id = req.params.requset_id;
    await RequestModel.deleteOne({ _id: request_id });
    return res.status(200).json({
      notice: {
        success: true,
        message: "ລົບບັນທຶກການຮ້ອງຂໍທີ່ມີຢູ່ ສຳເລັດ",
      },
    });
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:request_id", async (req, res) => {
  try {
    const request_id = req.params.request_id;
    const payload = req.body;
    console.log(payload);
    const lastRequset = await RequestModel.updateOne(
      { _id: request_id },
      { $set: payload }
    );
    console.log(lastRequset);
    return res.status(200).json({
      notice: {
        success: true,
        message: "ແກ້ໄຂ ຂໍ້ມູນການຮ້ອງຂໍ ສຳເລັດ",
      },
      data: lastRequset,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
