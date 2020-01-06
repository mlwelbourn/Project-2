const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const port = 3000;
require('./db/db.js');

//middleware
app.use(session({
    secret: 'ilovesecrets',
    resave: false,
    saveUninitialized: false
}));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

//controllers
const cityController = require('./controllers/cities.js')
app.use('/cities', cityController);

const restaurantController = require('./controllers/restaurants.js');
app.use('/restaurants', restaurantController);

const mealController = require('./controllers/meals.js');
app.use('/meals', mealController);

const userController = require('./controllers/users.js');
app.use('/auth', userController);



app.get('/', (req, res)=>{
    res.render('index.ejs', {
        message: req.session.message,
        logged: req.session.logged,
        username: req.session.username
    })
});

app.listen(port, ()=>{
    console.log('ALIVE AS FUCK BRUH');
});