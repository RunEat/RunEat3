const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const Diary = require('./Diary.model')
const Meal = require('./Meal.model')
const Sport = require('./Sport.model')


const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema(
  {
    email: {
      unique: true,
      type: String,
      required: "Email is required",
      match: [EMAIL_PATTERN, "Email is not valid"],
    },
    // googleID: {
    //   type: String,
    //   default: null
    // },
    password: {
      type: String,
      required: "Password is required",
      minLength: [8, "Password must have 8 characters or more"],
    },
    username: {
      type: String,
      required: "Username is required",
    },
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    age: {
      type: Number,
      required: "Age is required",
      min: 16,
      max: 120,
    },
    weight: {
      type: Number,
      required: "Weight is required",
      min: 40,
      max: 300,
    },
    height: {
      type: Number,
      required: "Height is required",
      min: 130,
      max: 230,
    },
    activity: {
      type: [String],
      required: true,
      enum: ["Sedentary", "Moderate", "Active", "Very active"]
    },
    avatar: {
      type: String,
      validate: {
        // Mongoose method to validate images
        validator: (value) => {
          // A value is passed
          try {
            const url = new URL(value);

            return url.protocol === "http:" || url.protocol === "https:"; // If the value doesn't start like this most probably it won't be an image
          } catch (err) {
            return false;
          }
        },
        message: () => "Invalid image URL", // This message is returned
      },
    },
    active: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: uuidv4(),
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret._v;
        delete ret.password;
        return ret;
      },
    },
  }
);

// Password hash
userSchema.pre('save', function(next){
	if (this.isModified('password')) {
		bcrypt.hash(this.password, SALT_WORK_FACTOR)
			.then(hash => {
				this.password = hash
				next()
			})
	} else {
		next()
	}
});

userSchema.methods.checkPassword = function (passwordToCheck) {
	return bcrypt.compare(passwordToCheck, this.password);
};

//Virtuals
userSchema.virtual('Diary', {
    ref: Diary.modelName,
    localField: '_id',
    foreignField: 'user'
})

userSchema.virtual("Meal", {
  ref: Meal.modelName,
  localField: "_id",
  foreignField: "user",
});

userSchema.virtual("Sport", {
  ref: Sport.modelName,
  localField: "_id",
  foreignField: "user",
});

const User = mongoose.model('User', userSchema);

module.exports = User;