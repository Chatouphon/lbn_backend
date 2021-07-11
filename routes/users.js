var express = require("express");
var router = express.Router();
const gauth = require("./vertifyIdToken");
const Donor = require("../models/DonorSchema");

/* GET users listing. */
router.get("/signin", gauth, async function (req, res) {
  try {
    const donorId = req.userGoogle['sub']
    const donorExist = await Donor.findOne({ donorId: donorId }).populate('bloodGroup')
    if (!donorExist) {
      return res.json({
        alert: true,
        donorExist: false,
        message:
          "ບັນຊີ Google ຂອງທ່ານບໍ່ທັນໄດ້ລົງທະບຽນ. ກະລຸນາໄປທີ່ໜ້າ Sign Up ເພື່ອລົງທະບຽນ",
      });
    }
    res.status(200).json({
      notice: {
        success: true,
        message: "Sign In ສຳເລັດ",
      },
      data: donorExist,
    })
  } catch (error) {
    res.status(400).json({
      message: "Sign In ບໍ່ສຳເລັດ",
    });
    console.log(error);
  }
})

router.post("/signup", gauth, async function (req, res, next) {
  try {
    const newDonor = req.body;
    newDonor['donorId'] = req.userGoogle['sub']
    newDonor['image'] = req.userGoogle['picture']
    const donorExist = await Donor.findOne({ donorId: newDonor['donorId'] });
    console.log(donorExist)
    if (donorExist) {
      return res.json({
        alert: true,
        donorExist: true,
        message:
          "ບັນຊີ Google ຂອງທ່ານໄດ້ມີການລົງທະບຽນຢູ່ແລ້ວ. ກະລຸນາໄປທີ່ໜ້າ Sign In ເພື່ອເຂົ້າສູ່ລະບົບ",
      });
    }
    const donor = new Donor(newDonor);
    const donorInfo = await donor.save();
    res.status(201).json({
      notice: {
        success: true,
        message: "Sign Up ສຳເລັດ",
      },
      data: donorInfo,
    });
  } catch (error) {
    res.status(400).json({
      message: "Sign Up ບໍ່ສຳເລັດ",
    });
    console.log(error);
  }
});

module.exports = router;
