const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
    collection: "Request",
  }
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
