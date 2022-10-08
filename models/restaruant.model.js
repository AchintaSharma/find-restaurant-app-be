const mongoose = require('mongoose');

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
    imageUrl : String,
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

module.exports = new mongoose.model('Restaurant', restaurantSchema);
