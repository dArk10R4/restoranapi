const mongoose = require("mongoose");
const { SPECIAL_DIET_TYPES, MEAL_TYPES } = require("../utility/constants");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"], // 'location.type' must be 'Point'
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    rating: {
      type: Number,
      required: true,
    },
    features: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "features",
    },
    menu: {
      type: String,
      required: true,
    },
    atmosphere: {
      type: Number,
      // required: true
    },
    service: {
      type: Number,
      // required: true
    },
    value: {
      type: Number,
      // required: true
    },
    food: {
      type: Number,
      // required: true
    },
    minprice: {
      type: Number,
      // required: true
    },
    maxprice: {
      type: Number,
      // required: true
    },
    phone: {
      type: String,
      // required: true
    },
    locations: {
      type: String,
      // required: true
    },
    specialDiet: {
      type: [String],
      enum: SPECIAL_DIET_TYPES,
    },
    mealType: {
      type: [String],
      enum: MEAL_TYPES,
    },
    meals: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    sets: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    image: {
      type: String,
      // required: true
    },
  },
  {
    timestamps: true,
  }
);



restaurantSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("restaurants", restaurantSchema);
