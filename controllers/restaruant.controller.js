const Restaurant = require('../models/restaruant.model');

exports.addRestaurant = async (req, res) => {
    console.log(req.body)
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    } //Check
    const restaurantObj = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        imageUrl: req.body.imageUrl,
        location: req.body.location,
        phone: req.body.phone,
        rating: req.body.rating
    };

    try {
        const restaurant = Restaurant.create(restaurantObj);

        res.status(200).send(restaurant);
    } catch (err) {
        console.log("Error while creating restaurant: ", err.message);
        return res.status(500).send({
            message: "Some error occured while creating the Restaurant"
        })
    }
}
