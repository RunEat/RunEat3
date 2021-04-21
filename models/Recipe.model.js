const mongoose = require('mongoose');
const Meal= require('./Meal.model');

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: 'Recipe name is required'
  },
  macros: {
    carbs: {
      type: Number
    },
    proteins: {
      type: Number
    },
    fats: {
      type: Number
    }
  },
  calories: {
    type: Number,
    min: 0,
    required: 'Number of calories is required'
  },
  image: {
    type: String,
		validate: { // Mongoose method to validate images
		  validator: value => { // A value is passed
			try {
			  const url = new URL(value)
  
			  return url.protocol === 'http:' || url.protocol === 'https:' // If the value doesn't start like this most probably it won't be an image
			} catch(err) {
			  return false
			}
		  },
		  message: () => 'Invalid image URL' // This message is returned
		},
  },
  ingredients: {
    type: [String],
    required: true
  },
  dietLabel: {
    type: [String],
  },
  instructions: {
    // validator: value => {
		// 	try {
		// 	  const url = new URL(value)
  
		// 	  return url.protocol === 'http:' || url.protocol === 'https:' 
		// 	} catch(err) {
		// 	  return false
		// 	}
		//   },
		//   message: () => 'Invalid image URL'
    type: String,
	},
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

recipeSchema.virtual('Meal', {
  ref: Meal.modelName,
  localField: '_id',
  foreignField: 'recipe'
})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;