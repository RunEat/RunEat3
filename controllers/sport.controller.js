const createError = require('http-errors');

const User = require('../models/User.model');
const Diary = require('../models/Diary.model');
const Sport = require('../models/Sport.model');
const Meal = require('../models/Meal.model');

module.exports.addSport = (req, res, next) => {

  // Sport.create(req.body)
  //   .then((sport) => {
  //     console.log('req.body', req.body.chronometer.startTime)
  let response = req.body
  let day = response.date

  let start = new Date(day);
  start.setHours(0, 0, 0, 0)

  let end = new Date(day);
  end.setHours(23, 59, 59, 599)

  console.log('day', day)
  console.log('start', start)
  console.log('end', end)

  Diary.findOne({date: { $gte: start, $lte: end }, user: req.currentUser})
    .then((diary) => {
      //console.log('diary', diary)
      //console.log('sport', sport)
      if (diary) {
        console.log('diary', diary)
        Sport.findOne({date: { $gte: start, $lte: end }, user: req.currentUser})
          .then((sport) => {
            console.log('sport before', sport)
            
            Object.entries(req.body).forEach(([key, value]) => { // For each body element it creates a key value pair
              sport[key] = value;
            });

            return sport.save().then(() => res.status(200).json(sport));
        })
      } else {
        console.log('else')
        Sport.create(response)
          .then((sport) => { 
            console.log('sport created else diary does not exist', sport)
            Meal.create({
              mealType: {
                breakfast: null,
                lunch: null,
                dinner: null,
                snacks: null,
              },
              date: day,
              user: req.currentUser,
            })
              .then((meal) => {
                Diary.create({
                  sport: sport.id,
                  meal: meal.id,
                  user: req.currentUser,
                  date: day,
                })
                  .then((diary) => {
                    console.log("Diary created", diary);
                    res.status(200).json(diary);
                  })
                  .catch(next);
              })
              .catch(next);
          })
      }
    })
    .catch(next)
  //res.status(201).json(sport)

  //  })
  //  .catch(next)
}


module.exports.deleteSport = (req, res, next) => {
  console.log('req.params.id', req.params.id)


  Diary.findById(req.params.id)
    .then((diary) => {
      console.log('diarySport', diary)
      Sport.findByIdAndDelete(diary.sport) // If more than one sport --> deleteMany
        .then((sport) => {
          //console.log('sport', sport)
          console.log('Sport deleted', sport)
          res.status(204).json({})
        })
        .catch(next)

      Diary.findByIdAndUpdate(diary._id, {
          sport: null
        }, {
          new: true
        })
        .then((diary) => {
          console.log('diary updated', diary)
        })
        .catch(next)
    })
    .catch(next)
}