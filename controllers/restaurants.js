const express = require('express');
const router = express.Router();

const City = require('../models/city');
const Restaurant = require('../models/restaurant');
const Meal = require('../models/meal');


//new restaurant
// New route
router.get('/new', async (req, res) => {
	try {
		const allCities = await City.find();

		res.render('restaurant/new.ejs', {
			city: allCities
		});
	} catch (err) {
		res.send(err);
	}
});

// Create restaurant route
router.post('/', async (req, res) => {
	try {
		await Restaurant.create(req.body);

		res.redirect('/cities');
	} catch (err) {
		res.send(err);
	}
});

// Restaurant Index route
router.get('/', async (req, res) => {
	try {
		const foundRestaurants = await Restaurant.find();

		res.render('restaurant/index.ejs', {
			restaurant: foundRestaurants
		});
	} catch (err) {
		res.send(err);
	}
});

//Show Route
router.get('/:id', async (req, res) => {
	try{
		const foundRestaurants = await Restaurant.findById(req.params.id).populate('city');
		const restaurantMeal = await Meal.find({ restaurant: foundRestaurants._id });
		res.render('restaurant/show.ejs', {
			restaurant: foundRestaurants,
			meal: restaurantMeal
		})
	} catch (err) {
		res.send(err);
	}
});

// Delete route
router.delete('/:id', async (req, res) => {
	try {
		await Restaurant.findByIdAndRemove(req.params.id);

		await Meal.deleteMany({ restaurant: req.params.id });		
		
		res.redirect('/restaurants');
	} catch (err) {
		res.send(err);
	}
});

// Edit route
router.get('/:id/edit', async (req, res) => {
	try {
		const foundRestaurant = await Restaurant.findById(req.params.id);

		const allCities = await City.find();

		res.render('restaurant/edit.ejs', {
			restaurant: foundRestaurant,
			city: allCities,
		});
		
	} catch (err) {
		res.send(err);
	}
});

// Update route
router.put('/:id', async (req, res) => {
	try {
		await Restaurant.findByIdAndUpdate(req.params.id, req.body);
		
		res.redirect(`/restaurants/${req.params.id}`);
	} catch (err) {
		res.send(err);
	}
});





module.exports = router
