const createError = require('http-errors');

const User = require('../models/User.model')
const Diary = require('../models/Diary.model')
const Sport = require('../models/Sport.model')
const Meal = require('../models/Meal.model')
const Recipe = require('../models/Recipe.model')

module.exports.getDiary = (req, res, next) => {
    const user = req.currentUser
    //console.log('user', user)
    let start = new Date(req.query.date);
    start.setHours(0, 0, 0, 0) 

    let end = new Date(req.query.date);
    end.setHours(23, 59, 59, 599)

    console.log('start', start)
    console.log('end', end)
     
    Diary.findOne({
      $and: [{ date: { $gte: start } }, { date: { $lte: end } }],
    })
        .populate("user sport meal")
        //.populate("meal")
        // .populate('breakfast lunch dinner snacks')
        .populate({
          path: "meal",
          populate: {
            path: "mealType",
                populate: {
                path: "breakfast lunch dinner snacks"
            }
          },
        })
      .then((diary) => {
        console.log("diary.meal", diary.meal);
        res.status(200).json(diary);
      })
      .catch(next);
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



