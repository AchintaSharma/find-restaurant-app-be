//Import the Controller
const RestaurantController = require('../controllers/restaruant.controller');

//Export the routes to app.js
module.exports = (app) => {
    app.post("/findrestaurant/api/v1/restaurant/add/", RestaurantController.addRestaurant);

    app.get("/findrestaurant/api/v1/restaurant/", RestaurantController.findAllRestaurants);

    app.get("/findrestaurant/api/v1/restaurant/categories", RestaurantController.findRestaurantCategories);

    app.get("/findrestaurant/api/v1/restaurant/categories/:categoryName", RestaurantController.findRestaurantByCategoryName);

    app.get("/findrestaurant/api/v1/restaurant/:id", RestaurantController.findRestaurantById);

    app.get("/findrestaurant/api/v1/restaurant/rating/:ratingValue", RestaurantController.findRestaurantByRating);

    app.put("/findrestaurant/api/v1/restaurant/:id", RestaurantController.updateRestaurant);

    app.delete("/findrestaurant/api/v1/restaurant/:id", RestaurantController.deleteRestaurant);

    app.delete("/findrestaurant/api/v1/restaurant/", RestaurantController.deleteAllRestaurants);
}