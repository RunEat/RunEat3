const createError = require('http-errors');

const User = require('../models/User.model.js')
const Diary = require('../models/Diary.model')
const Sport = require('../models/Sport.model')
const Meal = require('../models/Meal.model')
const Recipe = require('../models/Recipe.model')

module.exports.getDiary = (req, res, next) => {
    const user = req.currentUser
    const date = new Date(req.query.date)
    //console.log('user', user)
    //console.log('req.query.date', req.query.date)

    //Diary.findOne({date: date})
    Diary.findOne({ $and: [{user: user}, {date: date}]})
        //.populate('user')
        .populate('sport')
        .populate('meal')
        .then(diary => {
            //console.log ('diary', diary)
            res.json(diary)
        })
        .catch(next)
}

module.exports.deleteDiary = (req, res, next) => {
    Diary.findOne({date: req.query.date})
        .then((diary) => {
            Sport.findByIdAndDelete(diary.sport) // If more than one sport --> deleteMany
                .then(() => {
                    console.log('Sport deleted')
                })
                .catch(next)

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
                .catch(next)
            
            Diary.findByIdAndDelete(diary.id)
                .then(() => {
                    res.status(200).json({})
                })
                .catch(next)
        })
        .catch(next)
}



