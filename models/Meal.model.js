const mongoose = require('mongoose');
const Diary= require('../models/Diary.model');

const mealSchema = mongoose.Schema({

})

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;