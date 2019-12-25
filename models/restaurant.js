const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    name: {type: String, required: true},
    location: String,
    comments: String,
    rating: {
        food: {type: Number, max: 10},
        drinks: {type: Number, max: 10},
        service: {type: Number, max: 10},
        ambiance: {type: Number, max: 10}
    },
    city: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'City'
    }

});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;