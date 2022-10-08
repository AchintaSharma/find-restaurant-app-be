const dbConfig = require('../configs/db.config');
const Restaurant = require('../models/restaruant.model');

exports.addRestaurant = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    };

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
        const restaurant = await Restaurant.create(restaurantObj);

        res.status(200).send(restaurant);
    } catch (err) {
        console.log("Error while creating restaurant: ", err.message);
        return res.status(500).send({
            message: "Some error occured while creating the Restaurant"
        })
    }
}

exports.findAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();

        return res.status(200).send({
            restaurants: restaurants,
            message: "Restaurants fetched successfully"
        })

    } catch (err) {
        console.log("Error while fetching restaurant: ", err.message);
        return res.status(500).send({
            message: "Some error occured while fetching the Restaurants"
        })
    }
}

exports.findRestaurantCategories = async (req, res) => {
    try {
        const restaruantCategories = await Restaurant.find().distinct('category');

        return res.status(200).send(restaruantCategories);

    } catch (err) {
        console.log("Error while fetching restaurant categories: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while fetching categories"
        })
    }
}

exports.findRestaurantByCategory = async (req, res) => {
    try {
        const restaruants = await Restaurant.find({ category: req.params.categoryName });

        return res.status(200).send(restaruants);


    } catch (err) {
        console.log("Error while fetching restaurant categories: ", err.message);
        return res.status(500).send({
            message: "Some error occured while fetching the Restaurant"
        })
    }
}

exports.findRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.find({ _id: req.params.id });

        if (!restaurant) {
            return res.status(404).send({
                message: "No Restaurant found with the given ID."
            })
        }
        return res.status(200).send(restaurant);

    } catch (err) {
        console.log("Error while fetching restaurant : ", err.message);
        return res.status(500).send({
            message: "Some error occured while fetching the Restaurant"
        })
    }
}


exports.findRestaurantByRating = async (req, res) => {
    try {
        const restaurant = await Restaurant.find({ rating: { $gte: req.params.ratingValue } });

        return res.status(200).send(restaurant);

    } catch (err) {
        console.log("Error while fetching restaurant : ", err.message);
        return res.status(500).send({
            message: "Some error occured while fetching the Restaurant"
        })
    }
}

exports.updateRestaurant = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Restaurant data is required."
        })
    };

    try {
        const restaurant = await Restaurant.findOne({ _id: req.params.id });

        if (!restaurant) {
            return res.status(200).send({
                message: "No Restaurant found for given ID."
            })
        } else {
            restaurant.name = req.body.name;
            restaurant.description = req.body.description;
            restaurant.category = req.body.category;
            restaurant.imageUrl = req.body.imageUrl;
            restaurant.location = req.body.location;
            restaurant.phone = req.body.phone;
            restaurant.rating = req.body.rating;
        }
        await restaurant.save();
        res.status(200).send({
            message: "Restaurant updated successfully."
        })
    } catch (err) {
        console.log("Error while fetching restaurant : ", err.message);
        return res.status(500).send({
            message: "Some error occured while fetching the Restaurant"
        })
    }
}

exports.deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ _id: req.params.id });
        if (restaurant) {
            await restaurant.remove();
        }

        res.status(200).send({
            restaurant,
            message: `Restaurant deleted successfully.`
        });
    } catch (err) {
        console.log("Error while deleting restaurant: ", err.message);
        return res.status(500).send({
            message: "Some error occured while deleting the restaurant"
        })
    }
}

exports.deleteAllRestaurants = async (req, res) => {
    try {
        const deleted = await Restaurant.deleteMany();

        return res.status(200).send({
            restaurants: deleted,
            message: "Restaurants deleted successfully."
        });
        
    } catch (err) {
        console.log("Error while deleting restaurants: ", err.message);
        return res.status(500).send({
            message: "Some error occured while deleting the restaurants"
        })
    }
}