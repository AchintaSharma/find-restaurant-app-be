const dbConfig = require('../configs/db.config');
const Restaurant = require('../models/restaruant.model');

exports.addRestaurant = async (req, res) => {

    if (Object.keys(req.body).length === 0) {
        console.log("trapped");
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
        const restaruants = await Restaurant.find({ category: req.params.categoryName});

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
        const restaurant = await Restaurant.find({ _id: req.params.id});

        if(!restaurant) {
            return res.status(404).send({
                message : "No Restaurant found with the given ID."
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
        const restaurant = await Restaurant.find({ rating : {$gte : req.params.ratingValue}});

        return res.status(200).send(restaurant);
        
    } catch (err) {
        console.log("Error while fetching restaurant : ", err.message);
        return res.status(500).send({
            message: "Some error occured while fetching the Restaurant"
        })
    }
}