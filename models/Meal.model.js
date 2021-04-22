const mongoose = require('mongoose');
const Diary = require('./Diary.model');
const Recipe = require ('./Recipe.model')

const mealSchema = mongoose.Schema({
  mealType: {
    breakfast: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'recipe'
    },
    lunch: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'recipe'
    },
    dinner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'recipe'
    },
    snacks: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'recipe'
    }
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

mealSchema.virtual('Diary', {
  ref: Diary.modelName,
  localField: '_id',
  foreignField: 'meal'
})

mealSchema.virtual('Recipe', {
  ref: Recipe.modelName,
  localField: '_id',
  foreignField: 'meal'
})

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;