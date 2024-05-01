const {Router} = require('express');
const RestaurantController = require('../controllers/Restaurant');

const router = Router();

router.get('/restaurants', RestaurantController.getRestaurants);
router.get('/restaurants/:id', RestaurantController.getRestaurantById);
router.post('/restaurants', RestaurantController.postRestaurants)


module.exports = router;