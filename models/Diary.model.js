const mongoose = require('mongoose');
const Meal = import('../models/Meal.model')

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
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id
      delete ret._id
      delete ret._v
      return ret
    }
  }
})

diarySchema.virtual('Meal', {
  ref: Meal.modelName,
  localField: '_id',
  foreignField: 'diary'
})

const Diary = mongoose.model('Diary', diarySchema);

module.exports = Diary;