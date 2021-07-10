var express = require("express");
var router = express.Router();
const gauth = require("./vertifyIdToken");
const Donor = require("../models/DonorSchema");

/* GET users listing. */
router.post("/signup", gauth, async function (req, res, next) {
  // res.send('respond with a resource');
  // console.log(req.userGoogle)
  console.log(req.userGoogle)
  console.log(req.body)
  // try {
  //   const newDonor = req.body;
  //   const donorExist = await Donor.findById(req.body.donorId);
  //   if (donorExist) {
  //     return res.json({
  //       alert: true,
  //       donorExist: true,
  //       message:
  //         "ບັນຊີ Google ຂອງທ່ານໄດ້ມີການສະໝັກຢູ່ແລ້ວ. ກະລຸນາໄປທີ່ໜ້າ Sign In ເພື່ອເຂົ້າສູ່ລະບົບ",
  //     });
  //   }
  //   const donor = new Donor(newDonor);
  //   await donor.save();
  //   res.status(201).json({
  //     notice: {
  //       success: true,
  //       message: "ບັນທຶກສຳເລັດ",
  //     },
  //     data: donor,
  //   });
  // } catch (error) {
  //   res.status(400).json({
  //     message: "ບັນທຶກບໍ່ສຳເລັດ",
  //   });
  //   console.log(error);
  // }
});
//message

module.exports = router;
