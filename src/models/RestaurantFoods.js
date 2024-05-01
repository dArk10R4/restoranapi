const mongoose = require("mongoose");

const restaurantFoodsSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurants",
      required: true,
    },
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foods",
      required: true,
    },
    minprice: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    maxprice: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("restaurantfoods", restaurantFoodsSchema);