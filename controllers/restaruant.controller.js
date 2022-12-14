const { default: mongoose } = require('mongoose');
const dbConfig = require('../configs/db.config');
const Restaurant = require('../models/restaruant.model');

//Method for adding a restaurant
exports.addRestaurant = async (req, res) => {
    /**
     * Check if any details is not provided in req body. 
     * Additional middleware may be used for detailed validation
     */
    if (Object.keys(req.body).length < 7) {
        return res.status(400).send({
            message: "Content cannot be empty"
        })
    };
    //Create an object having the request details
    const restaurantObj = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        imageURL: req.body.imageURL,
        location: req.body.location,
        phone: req.body.phone,
        rating: req.body.rating
    };
    //Store the object in DB
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

//Method to fetch all restaurants
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

//Find all categories of restaurants
exports.findRestaurantCategories = async (req, res) => {
    try {
        const restaruantCategories = await Restaurant.find().distinct('category');

        return res.status(200).send(restaruantCategories);

    } catch (err) {
        console.log("Error while fetching restaurant categories: ", err.message);
        return res.status(500).send({
            message: "Some error occured while fetching Categories"
        })
    }
}

//Find all restaurants of a particular category
exports.findRestaurantByCategoryName = async (req, res) => {
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

//Method to find restaurant by id
exports.findRestaurantById = async (req, res) => {
    // Handle exception for invalid id 
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({
            message : "Invalid id type"
        });
    }
    try {
        const restaurant = await Restaurant.find({ _id: req.params.id });
        console.log(restaurant)
        if (restaurant.length == 0) {
            console.log("Entered")
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

//Method to fetch restaurants by rating value
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

//Method to update details of a restaurant with a particular id
exports.updateRestaurant = async (req, res) => {
    /**
     * Check if any details is not provided in req body. 
     * Additional middleware may be used for detailed validation
     */
    if (Object.keys(req.body).length < 7) {
        return res.status(400).send({
            message: "Restaurant Data is required."
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
            restaurant.imageURL = req.body.imageURL;
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

//Method to delete a restaurant by id
exports.deleteRestaurant = async (req, res) => {
    // Handle exception for invalid id 
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({
            message : "Invalid id type"
        });
    }
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
            message: "Some error occured while deleting the Restaurant."
        })
    }
}

//Method to delete all restaurants
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
            message: "Some error occured while deleting the Restaurants."
        })
    }
}