const mongoose = require('mongoose')
const faker = require('faker')

const User = require('../models/User.model')
const Diary = require('../models/Diary.model')
const Meal = require('../models/Meal.model')
const Recipe = require('../models/Recipe.model')
const Sport = require('../models/Sport.model')

require('../config/db.config')

let sportsCreated = []
let mealsCreated = []

mongoose.connection.once('open', () => {
  console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);

  mongoose.connection.db.dropDatabase()
    .then(() => console.log('Database clear'))
      .then(() => {
        const sports = []

        for (let index = 0; index < 5; index++) {
        sports.push({
            chronometer: {
                startTime: new Date,
                endTime: new Date
            },
            caloriesBurned: Math.floor(Math.random() * 500),
            distance: Math.floor(Math.random() * 25)
        })
        }
        
        return Sport.create(sports)

    })
      .then((sports) => {
        console.log(`${sports.length} sports created`)

        sportsCreated = sports;

        const recipes = []

        for (let index = 0; index < 4; index++) {
        recipes.push({
            name: faker.name.title(),
            macros: {
                carbs: Math.floor(Math.random() * 100),
                proteins: Math.floor(Math.random() * 100),
                fats: Math.floor(Math.random() * 100)
            },
            calories: Math.floor(Math.random() * 1000),
            image: faker.internet.url(),
            ingredients: faker.lorem.words(), //DUDO
            instructions: 'http://www.google.es'
        })
        }
        
        return Recipe.create(recipes) 
    })
      .then((recipes) => {
        //console.log(recipes)
        console.log(`${recipes.length} recipes created`)

      const meals = []

      for (let index = 0; index < 20; index++) {
        meals.push({
            mealType: { 
                breakfast: recipes[0]._id,
                lunch: recipes[1]._id,
                dinner: recipes[2]._id,
                snacks: recipes[3]._id
            }   
        })
      }

      return Meal.create(meals)
      })
      .then((meals) => {
        console.log(`${meals.length} recipes created`)

        mealsCreated = meals

        const users = []

      for (let index = 0; index < 5; index++) {
        users.push({
          email: faker.internet.email(),
          password: '12345678',
          username: faker.internet.userName(),
            age: Math.floor((Math.random() * (120 - 16) + 16)),
            weight: Math.floor((Math.random() * (300 - 40) + 40)),
            height: Math.floor((Math.random() * (230 - 130) + 130)),
          image: faker.internet.avatar()
        })
      }

      return User.create(users)
    })
    .then((users) => {  //Necesitamos aquí sports y meals
      
      console.log(`${users.length} users created`)

      const diaries = []

      console.log('sportsCreated', sportsCreated);

      for (let index = 0; index < 20; index++) {
        diaries.push({
            sport: sportsCreated[index]._id,
            meal: mealsCreated[index]._id,
            user: users.id,
            date: new Date,   
        })
      }

      return Diary.create(diaries)
    })
    .then((diaries) => {
      console.log(`${diaries.length} diaries created`)
    })
    .then(() => console.info(`- All data created!`))
    .catch(error => console.error(error))
    .finally(() => process.exit(0))
})