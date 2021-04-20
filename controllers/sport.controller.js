const createError = require('http-errors');

const User = require('../models/User.model');
const Diary = require('../models/Diary.model');
const Sport = require('../models/Sport.model');
const Meal = require('../models/Meal.model');

module.exports.addSport = (req, res, next) => {
  Sport.create(req.body)
    .then((sport) => res.status(201).json(sport))
      .catch(next)
    //Falta por crear Diary nuevo
}

module.exports.deleteSport = (req, res, next) => {

}