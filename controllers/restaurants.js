const express = require('express');
const router = express.Router();

const City = require('../models/city');
const Restaurant = require('../models/restaurant');


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
		const foundRestaurants = await (await Restaurant.findById(req.params.id)).populated('city');
		res.render('restaurant/show.ejs', {
			restaurant: foundRestaurants
		})
	} catch (err) {
		res.send(err);
	}
})


module.exports = router
