const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  guestId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
  storeOwnerId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
}, {
  timestamps: true,
  collection: "Report",
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
