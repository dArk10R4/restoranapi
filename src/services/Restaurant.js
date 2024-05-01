const RestaurantRepository = require("../repositories/Restaurant");
const {
  validateRestaurantFilter,
  validateLocation,
  validateRating,
  validateChoices,
  validatePrice,
  validateFeatures,
  validateBounds,
  validateStringArray
} = require("../utility/validator");

class Restaurant {
  async filterRestaurants(data = {}) {
    // if (data.location && typeof data.location === "array") {
    //     data.location = data.location.map(Number);
    // }

    let filters = {};

    console.log("services data is data",data)

    if (data.name) {
      filters.name = data.name;
    }
    let { value, error } = validateLocation({ location: data.location });
    if (data.location && error === undefined) {
      filters.location = value.location;
    }

    ({error, value} = validateRating({ rating: data.rating }));
    console.log(error, value)
    if (
      data.rating &&
      error === undefined
    ) {
      filters.rating = value.rating;
    }

    ({error, value} = validateBounds(data.bounds));
    if (data.bounds && error === undefined) {
      filters.bounds = value;
    }

    ({error, value} = validatePrice(data.price));

    if (data.price && error === undefined) {
      filters.price = value;
    }
    ({error, value} = validateStringArray(data.sets));

    if (data.sets && error === undefined) {
      filters.sets = value;
    }

    ({error, value} = validateStringArray(data.meals));

    if (data.meals && error === undefined) {
      filters.meals = value;
    }

    

    console.log("filters", filters);


    // ({error, value} = validateRestaurantFilter(data));

    if (error) {
      //   console.log(error);
      // throw error;
    }

    // console.log(value);

    try {
      console.log("services", filters);
      let restaurants = await RestaurantRepository.filterRestaurants(filters);
      return restaurants;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Restaurant();
