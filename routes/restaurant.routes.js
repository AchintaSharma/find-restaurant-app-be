const restaurantController = require('../controllers/restaruant.controller');

module.exports = (app) => {
    app.post("/findrestaurant/api/v1/restaurant/add/", restaurantController.addRestaurant);

    app.get("/findrestaurant/api/v1/restaurant/", restaurantController.findAllRestaurants);

    app.get("/findrestaurant/api/v1/restaurant/categories", restaurantController.findRestaurantCategories);

    app.get("/findrestaurant/api/v1/restaurant/categories/:categoryName", restaurantController.findRestaurantByCategory);

    app.get("/findrestaurant/api/v1/restaurant/:id", restaurantController.findRestaurantById);

    app.get("/findrestaurant/api/v1/restaurant/rating/:ratingValue", restaurantController.findRestaurantByRating);

    app.put("/findrestaurant/api/v1/restaurant/:id", restaurantController.updateRestaurant);

    app.delete("/findrestaurant/api/v1/restaurant/:id", restaurantController.deleteRestaurant);

    app.delete("/findrestaurant/api/v1/restaurant/", restaurantController.deleteAllRestaurants);
}