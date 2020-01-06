const express = require('express');
const router = express.Router();

const City = require('../models/city');
const Restaurant = require('../models/restaurant')
const Meal = require('../models/meal');


// New route
router.get('/new', async (req, res) => {
	try {
		const allRestaurants = await Restaurant.find();

		res.render('meal/new.ejs', {
			restaurant: allRestaurants
		});
	} catch (err) {
		res.send(err);
	}
});

// Create restaurant route
router.post('/', async (req, res) => {
	try {
		await Meal.create(req.body);

		res.redirect('/restaurants');
	} catch (err) {
		res.send(err);
	}
});

//Show Route
router.get('/:id', async (req, res) => {
	try{
		const foundMeals = await Meal.findById(req.params.id).populate('restaurant');
		res.render('meal/show.ejs', {
			meal: foundMeals
		})
	} catch (err) {
		res.send(err);
	}
});

// Delete route
router.delete('/:id', async (req, res) => {
	try {
		await Meal.findByIdAndRemove(req.params.id);
		res.redirect('/restaurants');
	} catch (err) {
		res.send(err);
	}
});

// Edit route
router.get('/:id/edit', async (req, res) => {
	try {
		const foundMeal = await Meal.findById(req.params.id);

		const allRestaurants = await Restaurant.find();

		res.render('meal/edit.ejs', {
			meal: foundMeal,
			restaurant: allRestaurants,
		});
		
	} catch (err) {
		res.send(err);
	}
});

// Update route
router.put('/:id', async (req, res) => {
	try {
		await Meal.findByIdAndUpdate(req.params.id, req.body);
		
		res.redirect(`/meals/${req.params.id}`);
	} catch (err) {
		res.send(err);
	}
});


module.exports = router;