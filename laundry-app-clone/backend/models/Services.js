const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const servicesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
  deleted: {
    type: Boolean,
  },
}, {
  timestamps: true,
  collection: "Services",
});

const Services = mongoose.model("Services", servicesSchema);

module.exports = Services;
