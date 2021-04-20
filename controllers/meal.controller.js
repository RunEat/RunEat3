const createError = require('http-errors');

const User = import('../models/User.model')
const Sport = import('../models/Sport.model')
const Diary = import('../models/Diary.model')
const Meal = import('../models/Meal.model')


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
}

module.exports.addMeal = (req, res, next) => {
    
}

module.exports.editMeal = (req, res, next) => {

}

module.exports.deleteMeal = (req, res, next) => {

}