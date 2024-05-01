const express = require('express');
const RestaurantController = require('../Controllers/Restaurant');
const router = express.Router();

router.get('/restaurants', async (req, res) => {
    let a = await RestaurantController.getAllRestaurants();
    console.log(a);
    res.json(a);
});

router.get('/nearrestaurants', async (req, res) => {
    let a = await RestaurantController.nearRestaurant({
        longitude:40.379274975999, latitude:49.8472535593431
    });
    console.log(a);
    res.json(a);
});
// router.get('/restaurants/:id',RestaurantController.getRestaurantById);

module.exports = router;