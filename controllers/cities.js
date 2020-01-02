const express = require('express');
const router = express.Router();

const City = require('../models/city');
const Restaurant = require('../models/restaurant')
const Meal = require('../models/meal');


//new route
router.get('/new', async (req, res) => {
    res.render('city/new.ejs');
});

//Create Route
router.post('/', async (req, res) => {
    try {
        await City.create(req.body);
        res.redirect('/cities');
    } catch (err) {
        res.send(err);
    }
});

//Index Route
router.get('/', async (req, res) => {
    try {
        const foundCities = await City.find();
        res.render('city/index.ejs', {
            city: foundCities
        });
    } catch (err) {
        res.send(err);
    }
})

// Show route
router.get('/:id', async (req, res) => {
	try {
		const foundCity = await City.findById(req.params.id);

		const cityRestaurant = await Restaurant.find({ city: foundCity._id });

		res.render('city/show.ejs', {
			city: foundCity,
			restaurant: cityRestaurant
		});
		
	} catch (err) {
		res.send(err);
	}
});

// Edit route
router.get('/:id/edit', async (req, res) => {
	try {
		const foundCity = await City.findById(req.params.id);

		res.render('city/edit.ejs', {
			city: foundCity
		});
		
	} catch (err) {
		res.send(err);
	}
});

// Update route
router.put('/:id', async (req, res) => {
	try {
		await City.findByIdAndUpdate(req.params.id, req.body);
		
		res.redirect(`/cities/${req.params.id}`);
	} catch (err) {
		res.send(err);
	}
});








// Delete route
router.delete('/:id', async (req, res) => {
	try {
		await City.findByIdAndRemove(req.params.id);

		await Restaurant.deleteMany({ author: req.params.id });		
		
		res.redirect('/cities');
	} catch (err) {
		res.send(err);
	}
});



module.exports = router;