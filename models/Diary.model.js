const mongoose = require('mongoose');
const moment = require('moment')

require('./Meal.model')
require('./User.model')
require('./Sport.model')

const diarySchema = mongoose.Schema({
    sport: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'sport'
    },
    meal: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'meal'
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
},
{
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id
      delete ret._id
      delete ret._v
      return ret
    }
  }
  })

diarySchema.virtual('DateOfDiary')
  .set(function (newDate) {
  this.date = new Date(newDate)
  })
  .get(function () {
  return this.date.toISOString().substring(0,10)
})


const Diary = mongoose.model('Diary', diarySchema);

module.exports = Diary;