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

    Diary.findOne({date: date})
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

    Diary.findById(req.params.id)
        .then((diary) => {
            diaryToDelete = diary
            console.log ('Entra en diary')
            Sport.findById(diary.sport) // If more than one sport --> deleteMany
                .then((sport) => {
                    console.log('sport', sport)
                    console.log('Sport deleted')
                    res.status(200).json({})
                })
                .catch(next)

            // Meal.findOne(diary.meal)
            //     .then((meal) => {
            //         Recipe.deleteMany({meal: meal._id})
            //             .then((meal) => {
            //                 console.log('Recipe deleted')
            //                 Meal.findByIdAndDelete(meal._id)
            //                     .then(() => {
            //                     console.log('Meal deleted')
            //                 })
            //         })
            //     })
            //     .catch(next)
            
            // Diary.findByIdAndDelete(diary.id)
            //     .then(() => {
            //         console.log('Diary findByIdAndDelete')
            //         res.status(200).json({})
            //     })
            //     .catch(next)
        })
        .then(() => {            
            Meal.findOne(diaryToDelete.meal)
                .then((meal) => {
                    Recipe.find({meal: meal._id})
                        //.populate('recipe')
                        .then((recipe) => {
                            console.log('recipe', recipe)
                            console.log('Recipe deleted')
                            //res.status(200).json({})
                            // Meal.findById(meal._id)
                            //     .then((meal) => {
                            //     console.log('meal', meal)
                            //     console.log('Meal deleted')
                            //     res.status(200).json({})
                            //     })
                            //     .catch(next)
                        })
                        .catch(next)
                })
                .catch(next)
        }) 
        .then(() => {
            Diary.findById(diaryToDelete.id)
            .then(() => {
                console.log('Diary findByIdAndDelete')
                res.status(200).json({})
            })
            .catch(next)
        })
        .catch(next)
}



