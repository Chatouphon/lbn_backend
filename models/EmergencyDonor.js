const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const emergencySchema = new Schema(
  {
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "request",
    },
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "donor",
    },
    dateDonor: String,
  },
  { timestamps: true, collection: "emergencyDonor" }
);

const EmergencyDonorModel = mongoose.model("emergencyDonor", emergencySchema);
module.exports = EmergencyDonorModel;
