const mongoose = require('mongoose');
const Meal = require('../models/Meal.model')

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


const Diary = mongoose.model('Diary', diarySchema);

module.exports = Diary;