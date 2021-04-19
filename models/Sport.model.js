const mongoose = require('mongoose');
const Diary= require('./Diary.model');

const sportSchema = mongoose.Schema({
  chronometer: {
    startTime: {
      type: Date
    },
    endTime: {
      type: Date
    }
  },
  caloriesBurned: {
    type: Number
  },
  distance: {
    type: Number
  },
  pace: {
    type: Number
  },
  // location: {
  //   type: {
  //     type: String,
  //     enum: ['Point'],
  //     required: true,
  //     default: 'Point'
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: true
  //   }
  // },
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
});

sportSchema.virtual('Diary', {
  ref: Diary.modelName,
  localField: '_id',
  foreignField: 'sport'
})

const Sport = mongoose.model('Sport');

module.exports = Sport;