const createError = require('http-errors');

const User = require('../models/User.model')
const Sport = require('../models/Sport.model')
const Recipe = require('../models/Recipe.model')
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
        .populate('Meal')
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
    Recipe.create(req.body)
    .then((recipe) => {
      //console.log('sport', sport)
        if (recipe.mealType == breakfast) {
            Meal.create({
            })

        }
      let day = sport.chronometer.startTime

      let start = new Date(day);
      start.setHours(0, 0, 0, 0)

      let end = new Date(day);
      end.setHours(23, 59, 59, 599)
    
      console.log('day', day)
      console.log('start', start)
      console.log('end', end)
      
      Diary.findOne(
        {
          $and: [
            {date: {$gte: start}},
            {date: {$lte: end}}
          ]
        })
        .then((diary) => {
          //console.log('diary', diary)
          //console.log('sport', sport)
          if (diary) {
            console.log('diary')
            Diary.findOneAndUpdate({_id: diary._id}, {sport: sport.id})
              .then((diary) => {
                console.log('diary updated', diary) //En consola muestra el diary sin actualizar pero lo actualiza en db.
                res.status(200).json(diary)
              })
              .catch(next)
          } else {
            console.log('else')
            Diary.create({
                sport: sport.id,
                meal: null,
                user: req.currentUser,
                date: day
              })
              .then((diary) => {
                console.log ('Diary created', diary)
                res.status(200).json(diary)
              })
              .catch(next)
          }
        })
        .catch(next)
      res.status(201).json(sport)

     })
     .catch(next)
}

module.exports.editMeal = (req, res, next) => {

}

module.exports.deleteMeal = (req, res, next) => {
    Diary.findById(req.params.id)
        .then((diary) => {
            Meal.findOne(diary.meal)
                .then((meal) => {
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
                    Meal.findByIdAndDelete(diary.meal)
                        .then((meal) => {
                            //console.log('meal', meal)
                            console.log('Meal deleted')
                            //res.status(200).json({})
                        })
                        .catch(next)
                })
                .catch(next)
            
            Diary.findByIdAndUpdate(diary._id, { meal: null }, { new: true })
                .then((diary) => {
                    console.log('diary updated', diary)
                    res.status(204).json(diary)
                })
                .catch(next)
        })
        .catch(next)
}