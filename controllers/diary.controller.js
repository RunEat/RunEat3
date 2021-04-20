const createError = require('http-errors');

const User = require('../models/User.model')
const Diary = require('../models/Diary.model')
const Sport = require('../models/Sport.model')
const Meal = require('../models/Meal.model')
const Recipe = require('../models/Recipe.model')

module.exports.getDiary = (req, res, next) => {
    const user = req.currentUser
    const date = new Date(req.query.date)
    //console.log('user', user)
    //console.log('req.query.date', req.query.date)

    Diary.findOne({ $and: [{user: user}, {date: date}]})
        //.populate('user')
        //.populate('sport')
        //populate('meal')
        .then(diary => {
            //console.log ('diary', diary)
            res.json(diary)
        })
        .catch(next)
}

module.exports.deleteDiary = (req, res, next) => {
    // const date = new Date(req.params)
    // console.log('date', date)
    console.log('req.body', req.body)
    console.log('req.params.id', req.params.id)
        
    let diaryToDelete
    //let mealToDelete

    Diary.findById(req.params.id)
        .then((diary) => {
            diaryToDelete = diary
            //console.log ('Entra en diary')
            Sport.findByIdAndDelete(diaryToDelete.sport) // If more than one sport --> deleteMany
                .then((sport) => {
                    //console.log('sport', sport)
                    console.log('Sport deleted')
                    //res.status(200).json({})
                })
                .catch(next)
        })
        .then(() => {            
            Meal.findOne(diaryToDelete.meal)
                .then((meal) => {
                    //mealToDelete = meal
                    Recipe.findByIdAndDelete(meal.mealType.breakfast)
                        .then((recipe) => {
                            //console.log('breakfast', recipe)
                            console.log('breakfast deleted')
                            //res.status(200).json({})
                        })
                        .catch(next)

                    Recipe.findByIdAndDelete(meal.mealType.lunch)
                        .then((recipe) => {
                            //console.log('Lunch', recipe)
                            console.log('lunch deleted')
                            //res.status(200).json({})
                        })
                        .catch(next)

                    Recipe.findByIdAndDelete(meal.mealType.dinner)
                        .then((recipe) => {
                            //console.log('dinner', recipe)
                            console.log('dinner deleted')
                            //res.status(200).json({})
                        })
                        .catch(next)
                        
                    Recipe.findByIdAndDelete(meal.mealType.snacks)
                        .then((recipe) => {
                            //console.log('snacks', recipe)
                            console.log('snacks deleted')
                            //res.status(200).json({})
                        })
                        .catch(next)
                })
                .then(() => {
                    Meal.findByIdAndDelete(diaryToDelete.meal)
                        .then((meal) => {
                            //console.log('meal', meal)
                            console.log('Meal deleted')
                            //res.status(200).json({})
                        })
                        .catch(next)
                })
                .catch(next)
        }) 
        .then(() => {
            Diary.findByIdAndDelete(diaryToDelete.id)
            .then(() => {
                //console.log('Diary findByIdAndDelete')
                console.log('Diary deleted')
                res.status(200).json({})
            })
            .catch(next)
        })
        .catch(next)
}



