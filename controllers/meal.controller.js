const createError = require('http-errors');

const User = require('../models/User.model')
const Sport = require('../models/Sport.model')
const Diary = require('../models/Diary.model')
const Meal = require('../models/Meal.model')


module.exports.getMeal = (req, res, next) => {
    const user = req.currentUser

    let start = new Date(req.query.date);
    start.setHours(0, 0, 0, 0) 

    let end = new Date(req.query.date);
    end.setHours(23, 59, 59, 599)

    Diary.findOne({ 
            $and: [
              {date: {$gte: start}},
              {date: {$lte: end}}
            ]
          })
        //.populate('meal')
        .then((diary) => {
            console.log('diary', diary)
            Meal.find(diary.meal)
                .populate('recipe')
                .then(meal => {
                    res.status(200).json(meal)
                })
        })
        .catch(next)
}

module.exports.addMeal = (req, res, next) => {
    
}

module.exports.editMeal = (req, res, next) => {

}

module.exports.deleteMeal = (req, res, next) => {
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
}