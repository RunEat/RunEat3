const createError = require('http-errors');

const User = require('../models/User.model')
const Sport = require('../models/Sport.model')
const Diary = require('../models/Diary.model')
const Meal = require('../models/Meal.model')


module.exports.getMeal = (req, res, next) => {
    const user = req.currentUser

    Diary.findOne({ date: req.query.date })
        .populate('meal')
        .then((diary) => {
            Meal.find(diary.meal)
                .populate('recipe')
                .then(meal => {
                    res.json(meal)
                })
        })
        .catch(next)
}

module.exports.addMeal = (req, res, next) => {
    
}

module.exports.editMeal = (req, res, next) => {

}

module.exports.deleteMeal = (req, res, next) => {

}