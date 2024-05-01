const RestaurantRepository = require("../repositories/Restaurant");
const { validateId } = require("../utility/validator");
const RestaurantService = require("../services/Restaurant");


class Restaurant {
  /**
   * Get all restaurants
   * @param {Object} req
   * @param {Object} res
   */
  async getRestaurants(req, res)  {


    let query = req.query;

    try {
      let restaurants = await RestaurantService.filterRestaurants(query);
      return res.json(restaurants);
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" });
    }
  }

  async postRestaurants(req, res) {
    let data = req.body;  
    console.log(req.body)

    try {
      let restaurants = await RestaurantService.filterRestaurants(data);
      return res.json(restaurants);
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: "Something went wrong" });
    }
  }

  async getRestaurantById(req, res) {
    try {
      let { error, value } = validateId(req.params.id);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      let restaurant = await RestaurantRepository.getRestaurantById(value);
      return res.json(restaurant);
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" });
    }
  }
}

module.exports = new Restaurant();
