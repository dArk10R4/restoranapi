const mongoose = require("mongoose");

const FOOD_TYPES = ["meal", "drink", "dessert"];

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: FOOD_TYPES,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("foods", foodSchema);