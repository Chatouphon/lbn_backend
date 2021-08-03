const router = require("express").Router();
const ActivityPlanModel = require("../models/ActivityPlanSchema");
const DonationModel = require("../models/DonationSchema");

router.get("/activity", async (req, res) => {
  try {
    const pickDate = req.query.pickDate;
    // console.log(req)
    // console.log(pickDate)
    const activities = await ActivityPlanModel.find({
      dateAt: { $all: [pickDate] },
    }).populate('addressId');
    const response = [];
    for (let activity in activities) {
      const people = await DonationModel.find({
        activityId: activities[activity]["_id"],
      }).count();
      let data = {
        _id: activities[activity]["_id"],
        title: activities[activity]["title"],
        verifyCode: activities[activity]["verifyCode"],
        timeStart: activities[activity]["timeStart"],
        timeEnd: activities[activity]["timeEnd"],
        address: activities[activity]["addressId"],
        count: people,
      };
      // console.log(data)
      response.push(data);
    }
    res.status(200).json({
      notice: {
        success: true,
        message: "ເຂົ້າເຖິງຂໍ້ມູນກິດຈະກຳສຳເລັດ (Dashbaord Admin)",
      },
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/chart", async (req, res) => {
  try {
    const pickYear = req.query.pickYear;
    const chart1 = [];
    const chart2 = [];
    const chart3 = [];
    const chart4 = [];
    const chart5 = [];
    const chart6 = [];
    const chart7 = [];
    const chart8 = [];
    const chart9 = [];
    const chart10 = [];
    const chart11 = [];
    const chart12 = [];
    const firstTime = [];
    const twoUp = [];
    const donation = await DonationModel.find().then((docs) => {
      // console.log(docs);
      docs.map((doc) => {
        // console.log(new Date(doc.createdAt).getFullYear() == pickYear)
        if (
          new Date(doc.createdAt).getMonth() === 0 &&
          new Date(doc.createdAt).getFullYear() == pickYear
        ) {
          chart1.push(doc);
        }
        if (
          new Date(doc.createdAt).getMonth() === 1 &&
          new Date(doc.createdAt).getFullYear() == pickYear
        ) {
          chart2.push(doc);
        }
        if (
          new Date(doc.createdAt).getMonth() === 2 &&
          new Date(doc.createdAt).getFullYear() == pickYear
        ) {
          chart3.push(doc);
        }
        if (
          new Date(doc.createdAt).getMonth() === 3 &&
          new Date(doc.createdAt).getFullYear() == pickYear
        ) {
          chart4.push(doc);
        }
        if (
          new Date(doc.createdAt).getMonth() === 4 &&
          new Date(doc.createdAt).getFullYear() == pickYear
        ) {
          chart5.push(doc);
        }
        if (
          new Date(doc.createdAt).getMonth() === 5 &&
          new Date(doc.createdAt).getFullYear() == pickYear
        ) {
          chart6.push(doc);
        }
        if (
          new Date(doc.createdAt).getMonth() === 6 &&
          new Date(doc.createdAt).getFullYear() == pickYear
        ) {
          chart7.push(doc);
        }
        if (
          new Date(doc.createdAt).getMonth() === 7 &&
          new Date(doc.createdAt).getFullYear() == pickYear
        ) {
          chart8.push(doc);
        }
        if (
          new Date(doc.createdAt).getMonth() === 8 &&
          new Date(doc.createdAt).getFullYear() == pickYear
        ) {
          chart9.push(doc);
        }
        if (
          new Date(doc.createdAt).getMonth() === 9 &&
          new Date(doc.createdAt).getFullYear() == pickYear
        ) {
          chart10.push(doc);
        }
        if (
          new Date(doc.createdAt).getMonth() === 10 &&
          new Date(doc.createdAt).getFullYear() == pickYear
        ) {
          chart11.push(doc);
        }
        if (
          new Date(doc.createdAt).getMonth() === 11 &&
          new Date(doc.createdAt).getFullYear() == pickYear
        ) {
          chart12.push(doc);
        }
      });
    });
    // let chartMonth = `chart${i}`
    // console.log(chartMonth)
    firstTime[0] = 0;
    twoUp[0] = 0;
    for (let chart in chart1) {
      let first = await DonationModel.find({
        donorId: chart1[chart]["donorId"],
        dateDonor: { $lt: `${pickYear}-02-01` },
      });
      if (first.length === 1) {
        firstTime[0] += 1;
      } else {
        twoUp[0] += 1;
      }
    }
    firstTime[1] = 0;
    twoUp[1] = 0;
    for (let chart in chart2) {
      let first = await DonationModel.find({
        donorId: chart2[chart]["donorId"],
        dateDonor: { $lt: `${pickYear}-03-01` },
      });
      if (first.length === 1) {
        firstTime[1] += 1;
      } else {
        twoUp[1] += 1;
      }
    }
    firstTime[2] = 0;
    twoUp[2] = 0;
    for (let chart in chart3) {
      let first = await DonationModel.find({
        donorId: chart3[chart]["donorId"],
        dateDonor: { $lt: `${pickYear}-04-01` },
      });
      if (first.length === 1) {
        firstTime[2] += 1;
      } else {
        twoUp[2] += 1;
      }
    }
    firstTime[3] = 0;
    twoUp[3] = 0;
    for (let chart in chart4) {
      let first = await DonationModel.find({
        donorId: chart4[chart]["donorId"],
        dateDonor: { $lt: `${pickYear}-05-01` },
      });
      if (first.length === 1) {
        firstTime[3] += 1;
      } else {
        twoUp[3] += 1;
      }
    }
    firstTime[4] = 0;
    twoUp[4] = 0;
    for (let chart in chart5) {
      let first = await DonationModel.find({
        donorId: chart5[chart]["donorId"],
        dateDonor: { $lt: `${pickYear}-06-01` },
      });
      if (first.length === 1) {
        firstTime[4] += 1;
      } else {
        twoUp[4] += 1;
      }
    }
    firstTime[5] = 0;
    twoUp[5] = 0;
    for (let chart in chart6) {
      let first = await DonationModel.find({
        donorId: chart6[chart]["donorId"],
        dateDonor: { $lt: `${pickYear}-07-01` },
      });
      if (first.length === 1) {
        firstTime[5] += 1;
      } else {
        twoUp[5] += 1;
      }
    }
    firstTime[6] = 0;
    twoUp[6] = 0;
    for (let chart in chart7) {
      //   console.log(chart7[chart]["donorId"]);
      let first = await DonationModel.find({
        donorId: chart7[chart]["donorId"],
        dateDonor: { $lt: `${pickYear}-08-01` },
      });
      // console.log(first.length)
      if (first.length === 1) {
        firstTime[6] += 1;
      } else {
        twoUp[6] += 1;
      }
    }
    firstTime[7] = 0;
    twoUp[7] = 0;
    for (let chart in chart8) {
      let first = await DonationModel.find({
        donorId: chart8[chart]["donorId"],
        dateDonor: { $lt: `${pickYear}-09-01` },
      });
      if (first.length === 1) {
        firstTime[7] += 1;
      } else {
        twoUp[7] += 1;
      }
    }
    firstTime[8] = 0;
    twoUp[8] = 0;
    for (let chart in chart9) {
      let first = await DonationModel.find({
        donorId: chart9[chart]["donorId"],
        dateDonor: { $lt: `${pickYear}-10-01` },
      });
      if (first.length === 1) {
        firstTime[8] += 1;
      } else {
        twoUp[8] += 1;
      }
    }
    firstTime[9] = 0;
    twoUp[9] = 0;
    for (let chart in chart10) {
      let first = await DonationModel.find({
        donorId: chart10[chart]["donorId"],
        dateDonor: { $lt: `${pickYear}-11-01` },
      });
      if (first.length === 1) {
        firstTime[9] += 1;
      } else {
        twoUp[9] += 1;
      }
    }
    firstTime[10] = 0;
    twoUp[10] = 0;
    for (let chart in chart11) {
      let first = await DonationModel.find({
        donorId: chart11[chart]["donorId"],
        dateDonor: { $lt: `${pickYear}-12-01` },
      });
      if (first.length === 1) {
        firstTime[10] += 1;
      } else {
        twoUp[10] += 1;
      }
    }
    firstTime[11] = 0;
    twoUp[11] = 0;
    for (let chart in chart12) {
      let first = await DonationModel.find({
        donorId: chart12[chart]["donorId"],
        dateDonor: { $lt: `${pickYear + 1}-01-01` },
      });
      if (first.length === 1) {
        firstTime[11] += 1;
      } else {
        twoUp[11] += 1;
      }
    }
    // res.send({
    //   chart1: chart1,
    //   chart2: chart2,
    //   chart3: chart3,
    //   chart4: chart4,
    //   chart5: chart5,
    //   chart6: chart6,
    //   chart7: chart7,
    //   chart8: chart8,
    //   chart9: chart9,
    //   chart10: chart10,
    //   chart11: chart11,
    //   firstTime: firstTime,
    //   twoUp: twoUp
    // });
    let AllDonate = await DonationModel.find().count();
    let countActivity = await ActivityPlanModel.find().count();
    res.status(200).json({
      firstTime: firstTime,
      twoUp: twoUp,
      countActivity: countActivity,
      AllDonate: AllDonate,
    });
  } catch (error) {
    console.log(error);
  }
});
router.get('/donor/list', async (req, res) => {
  try {
    const activityId = req.query.activityId
    const countDonor = await DonationModel.find({ activityId: activityId }).count()
    const activity = await ActivityPlanModel.findOne({ _id: activityId }).populate("addressId")
    const Donor = await DonationModel.find({ activityId: activityId }).populate("donorId")
    const DonorList = []
    for (let list in Donor) {
      DonorList.push(Donor[list]["donorId"])
    }
    // console.log(DonorList)
    res.status(200).json({
      notice: {
        success: true,
        message: 'ລາຍງານຜູ້ບໍລິຈາກ'
      },
      data: {
        activity: activity["title"],
        address: activity["addressId"]['addressName'],
        DonorList: DonorList,
        countDonor: countDonor
      }
    })
  } catch (error) {
    console.log(error)
  }
})

router.get('/bloodbank', async (req, res) => {
  try {
    const bloodbank = await ActivityPlanModel.findOne({ _id: "6108e7282726065274f9834e"}).populate("addressId")
    const count = await DonationModel.find({ activityId: "6108e7282726065274f9834e" }).count()
    res.status(200).json({
      notice: {
        success: true,
        message: "ຂໍ້ມູນການຮັບບໍລິຈາກທີ່ສູນເລືອດ"
      },
      data: {
        bloodbank: bloodbank,
        count: count
      }
    })
  } catch (error) {
    console.log(error)
  }
})
module.exports = router;
