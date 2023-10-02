const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Guest", "Store Owner", "Admin"],
    required: true,
  },
  pickAddress: {
    type: String,
  },
  backAddress: {
    type: String,
  },
  requestId: {
    type: Schema.Types.ObjectId,
    ref: "Request",
  },
  store: {
    name: {
      type: String,
    },
    status: {
      type: String,
    },
    address: {
      type: String,
    },
    avatarLink: {
      type: String,
    },
    dailyQuantity: {
      type: Number,
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Services",
      },
    ],
  },
  deleted: {
    type: Boolean,
  },
}, {
  timestamps: true,
  collection: "Account",
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
