const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: {type: String, required: true, unique: true},
    lastname: {type: String, required: true, unique: true},
})

const User = mongoose.model('User', userSchema);

module.exports = User;