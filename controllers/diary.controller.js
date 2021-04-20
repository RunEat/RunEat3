const createError = require('http-errors');
const Recipe = require('../models/Recipe.model');

//const Recipe = import('../models/Recipe.model')
const User = import('../models/User.model')
const Diary = import('../models/Diary.model')
const Sport = import('../models/Sport.model')
const Meal = import('../models/Meal.model')
const Recipe = import('../models/Recipe.model')

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
                next(createError(401, 'Unauthorized'))
            }
        })
        .catch(next)
}

module.exports.deleteDiary = (req, res, next) => {
    Diary.findOne({date: req.query.date})
        .then((diary) => {
            Sport.findByIdAndDelete(diary.sport) // If more than one sport --> deleteMany
                .then((diary) => {
                    console.log('Sport deleted')
                })

            Meal.findOne(diary.meal)
                .then((meal) => {
                    Recipe.deleteMany({meal: meal._id})
                        .then((meal) => {
                            console.log('Recipe deleted')
                            Meal.findByIdAndDelete(meal._id)
                                .then(() => {
                                console.log('Meal deleted')
                            })
                    })
                })
            
        })
        .catch(next)
}



