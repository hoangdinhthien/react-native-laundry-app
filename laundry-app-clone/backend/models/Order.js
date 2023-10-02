const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    customerInfo: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    storeOwnerId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    status: {
      type: String,
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Services",
      },
    ],
    totalWeight: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    note: {
      type: String,
    },
    timeLog: {
      type: String,
    },
    deleted: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    collection: "Order",
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
