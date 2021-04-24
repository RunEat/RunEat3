const mongoose = require('mongoose');

require('./Meal.model')
require('./User.model')
require('./Sport.model')

const diarySchema = mongoose.Schema({
    sport: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Sport'
    },
    meal: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Meal'
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
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