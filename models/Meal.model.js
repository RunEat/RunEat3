const mongoose = require('mongoose');
const Diary= require('../models/Diary.model');

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
  diary: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'diary'
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

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;