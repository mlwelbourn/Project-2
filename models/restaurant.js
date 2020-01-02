const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    name: {type: String, required: true},
    location: String,
    comments: String,
    rating: {
        food: {type: Number, max: 5},
        drinks: {type: Number, max: 5},
        service: {type: Number, max: 5},
        ambiance: {type: Number, max: 5}
    },
    city: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'City'
    }

});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;