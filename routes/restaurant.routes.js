const restaruantController = require('../controllers/restaruant.controller');

module.exports = (app) => {
    app.post("/findrestaurant/api/v1/restaurant/add/", restaruantController.addRestaurant);
}