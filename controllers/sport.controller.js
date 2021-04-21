const createError = require('http-errors');

const User = require('../models/User.model');
const Diary = require('../models/Diary.model');
const Sport = require('../models/Sport.model');
const Meal = require('../models/Meal.model');
const { date } = require('faker');

module.exports.addSport = (req, res, next) => {
  Sport.create(req.body)
    .then((sport) => {
      console.log('sport', sport)
      let day = sport.chronometer.endTime.split('T')
      console.log('day', day)
    //   Diary.findOne(
    //     {
    //       $and: [
    //         {date: {$gte: day}},
    //         {date: {$lte: new Date("2021-04-20T23:59:59.999Z")}}
    //       ]
    //     })
    //     .then((diary) => {
    //       console.log('diary', diary)
    //       res.status(201).json(diary)
    //       if (!diary) {
    //         Diary.create({
    //           sport: sport.id,
    //           meal: null,
    //           user: req.currentUser,
    //           date: Date.now()
    //         })
    //           .then((diary) => {
    //           console.log ('Diary created', diary)
    //           })
    //           .catch(next)
    //       } else if (diary) {
    //         console.log('sport', sport)
    //         Diary.findOneAndUpdate(diary._id, { sport: sport.id }, { new: true })
    //           .then((diary) => {
    //             console.log('diary updated', diary)
    //           })
    //           .catch(next)
    //       }
    //     })
    //     .catch(next)
    //   res.status(201).json(sport)

     })
     .catch(next)
  // Sport.create(req.body)
  //   .then((sport) => {
  //     res.status(201).json(sport)
  //   })
  //   .then((sport) => {
  //     console.log(sport)
  //     Diary.find({ sport: sport.id })
  //       .then((diary) => {
  //         if (!diary) {
  //           Diary.create({
  //           })
  //         } else {
  //           Diary.findOneAndUpdate()
              
  //         }
  //       })
  //       .catch(next)
  //   })
  //   .catch(next)
}


module.exports.deleteSport = (req, res, next) => {
  console.log('req.params.id', req.params.id)


  Diary.findById(req.params.id)
    .then((diary) => {
        console.log ('diarySport', diary)
        Sport.findByIdAndDelete(diary.sport) // If more than one sport --> deleteMany
            .then((sport) => {
                //console.log('sport', sport)
                console.log('Sport deleted', sport)
                res.status(204).json({})
            })
            .catch(next)
            
        Diary.findByIdAndUpdate(diary._id, { sport: null }, { new: true })
          .then((diary) => {
            console.log('diary updated', diary)
          })
          .catch(next)
    })
    .catch(next)
}