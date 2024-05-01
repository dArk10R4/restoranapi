const { default: mongoose } = require("mongoose");
const RestaurantModel = require("../Models/Restaurant");

console.log(RestaurantModel);

class Restaurant {
  constructor() {}

  async getAllRestaurants() {
    return await RestaurantModel.find();
  }

  async getRestaurantById(id) {
    return await RestaurantModel.findById(id);
  }

  async createRestaurant(data) {
    return await RestaurantModel.create(data);
  }

  async updateRestaurant(id, data) {
    return await RestaurantModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteRestaurant(id) {
    return await RestaurantModel.findByIdAndDelete(id);
  }

  async nearRestaurant(data) {
    return await RestaurantModel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [40.37365851454998, 49.81439923045112],
          },
          $maxDistance: 5000,
        },
      },
    });
  }
}

module.exports = new Restaurant();
