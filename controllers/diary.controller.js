const createError = require('http-errors');

//const Recipe = import('../models/Recipe.model')
const User = import('../models/User.model')
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

module.exports.deleteDiary = (req, res, next) => {
    Diary.findOneAndRemove(req.currentUser)
        .then(() => res.)
        .catch(next)
}



