const Joi = require("joi");
const { SPECIAL_DIET_TYPES, MEAL_TYPES } = require("./constants");

function validateId(id) {
  const idSchema = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required();
  return idSchema.validate(id);
}

function validateRestaurantFilter(data) {
  const schema = Joi.object({
    name: Joi.string(),
    location: Joi.array().length(2).items(
      Joi.number().min(-90).max(90), // Latitude range: -90 to 90
      Joi.number().min(-180).max(180) // Longitude range: -180 to 180
    ),
    // rating: Joi.number(),
    cuisine: Joi.string(),
    features: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    menu: Joi.array().items(Joi.string()),
    // atmosphere: Joi.number(),
    // service: Joi.number(),
    // value: Joi.number(),
    // food: Joi.number().min(0).max(10),
    minprice: Joi.number().min(0),
    maxprice: Joi.number().min(0),
    specialDiet: Joi.string().valid(...SPECIAL_DIET_TYPES),
    mealType: Joi.array().items(Joi.string().valid(...MEAL_TYPES)),
  });
  return schema.validate(data);
}

function validateLocation(data) {
  const schema = Joi.object({
    location: Joi.array().length(2).items(
      Joi.number().min(-90).max(90), // Latitude range: -90 to 90
      Joi.number().min(-180).max(180) // Longitude range: -180 to 180
    ),
  });
  return schema.validate(data);
}

function validateRating(data) {
  const schema = Joi.object({
    rating: Joi.number().min(0).max(5),
  });
  return schema.validate(data);
}

function validateChoices(data, choices) {
  const schema = Joi.array().items(Joi.string().valid(...choices));
  return schema.validate(data);
}

function validatePrice(data) {
  const schema = Joi.array().length(2).items(
    Joi.number().min(0),
    Joi.number().min(0),
  );
  return schema.validate(data);
}

function validateFeatures(data) {
  const schema = Joi.object({
    features: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
  });
  return schema.validate(data);
}

function validateBounds(data) {
  const schema = Joi.object({
    south: Joi.number().min(-180).max(180),
    west: Joi.number().min(-180).max(180),
    north: Joi.number().min(-180).max(180),
    east: Joi.number().min(-180).max(180),
  });
  return schema.validate(data);
}

function validateStringArray(data) {
  const schema = Joi.array().items(Joi.string());
  return schema.validate(data);
}


module.exports = {
  validateId,
  validateRestaurantFilter,
  validateLocation,
  validateRating,
  validateChoices,
  validatePrice,
  validateFeatures,
  validateBounds,
  validateStringArray
};
