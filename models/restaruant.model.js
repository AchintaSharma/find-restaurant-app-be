//Import dependencies
const mongoose = require('mongoose');

//Define Restaurant Schema
const restaurantSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    }, 
    description : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    imageURL : {
        type : String,
        required : true 
    },
    location : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        requird : true
    }
}, {timestamps : true});

//Export Restaurant Schema 
module.exports = new mongoose.model('Restaurant', restaurantSchema);
