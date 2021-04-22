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
const createdRecipes = []

mongoose.connection.once('open', () => {
  console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);

  mongoose.connection.db.dropDatabase()
    .then(() => console.log('Database clear'))
      .then(() => {
        const sports = []

        for (let index = 0; index < 1; index++) {
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

        for (let index = 0; index < 4; index++) {
        createdRecipes.push({
            name: faker.name.title(),
            macros: {
                carbs: Math.floor(Math.random() * 100),
                proteins: Math.floor(Math.random() * 100),
                fats: Math.floor(Math.random() * 100)
            },
            calories: Math.floor(Math.random() * 1000),
            image: faker.internet.url(),
            ingredients: faker.lorem.words(), //DUDO
            instructions: 'http://www.google.es',
            meal: null
        })
        }
        
        return Recipe.create(createdRecipes) 
    })
    .then((recipes) => {
      //console.log(recipes)
      console.log(`${recipes.length} recipes created`)
      
      //const meals = []

      for (let index = 0; index < 1; index++) {
        mealsCreated.push({
            mealType: { 
                breakfast: recipes[0]._id,
                lunch: recipes[1]._id,
                dinner: recipes[2]._id,
                snacks: recipes[3]._id
            },
            date: new Date().toDateString()
        })
      }
      // console.log('mealsCreated[0].mealType.breakfastreakfast', mealsCreated[0].mealType.breakfast)

      // createdRecipes[0].meal = mealsCreated[0].mealType.breakfast
      // console.log('recipes', createdRecipes)

      return Meal.create(mealsCreated)
      })
      .then((meals) => {
        console.log(`${meals.length} recipes created`)
        // console.log('mealsID', meals[0]._id)
        // console.log('createdRecipes1', createdRecipes)

        // let position = createdRecipes[0].meal
        
        // console.log('position', position)

        // position = ObjectId(`${meals[0]._id}`)
        // recipeID = meals[0].mealType.breakfast
        
        
        // Recipe.find(recipeID, {meal: position})

        mealsCreated = meals

        const users = []

      for (let index = 0; index < 1; index++) {
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
      console.log(users)

      const diaries = []

      for (let index = 0; index < 1; index++) {
        diaries.push({
            sport: sportsCreated[0]._id,
            meal: mealsCreated[0]._id,
            user: users[0].id,
            date: new Date().toDateString(),   
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