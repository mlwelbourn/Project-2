const mongoose = require('mongoose');

const mealSchema = mongoose.Schema({
    appetizer: String,
    salad: String,
    entree: {type: String, required: true},
    drink: String,
    dessert: String,
    comments: String,
    rating: {
        appetizer: {type: Number, max: 10},
        salad: {type: Number, max: 10},
        entree: {type: Number, max: 10},
        drink: {type: Number, max: 10},
        dessert: {type: Number, max: 10},
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Restaurant'
    }

});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;