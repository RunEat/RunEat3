const createError = require('http-errors');

const User = import('../models/User.model')
//const Recipe = import('../models/Recipe.model')
const Diary = import('../models/Diary.model')
const Sport = import('../models/Sport.model')
const Meal = import('../models/Meal.model')

module.exports.getDiary = (req, res, next) => {
    const user = req.currentUser

    Diary.findOne({date: req.query.date})
        .populate('user')
        .populate('sport')
        .populate('meal')
        .then(diary => {
            if (user === diary.user) {
                res.json(diary)
            } else {
                next(createError(403, 'Unauthorized'))
            }
        })
        .catch(next)
}

module.exports.resultSport = (req, res, next) => {
    
}

module.exports.getMeal = (req, res, next) => {
    const user = req.currentUser

    Diary.findOne({ date: req.query.date })
        .populate('meal')
        .then((diary) => {
            Meal.find({ diary: diary._id })
                .populate('recipe')
                .then(meal => {
                    res.json(meal)
                })
        })
}
