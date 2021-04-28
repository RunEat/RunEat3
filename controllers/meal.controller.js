const createError = require("http-errors");

const User = require("../models/User.model");
const Sport = require("../models/Sport.model");
const Recipe = require("../models/Recipe.model");
const Diary = require("../models/Diary.model");
const Meal = require("../models/Meal.model");

module.exports.getMeal = (req, res, next) => {
  const user = req.currentUser;

  let start = new Date(req.query.date);
  start.setHours(0, 0, 0, 0);

  let end = new Date(req.query.date);
  end.setHours(23, 59, 59, 599);

  Diary.findOne({
    $and: [
      {
        date: {
          $gte: start,
        },
      },
      {
        date: {
          $lte: end,
        },
      },
    ],
  })
    .populate("meal")
    .then((diary) => {
      console.log("diary", diary);
      Meal.findOne(diary.meal)
        .populate("mealType")
        // .populate('breakfast lunch dinner snacks')
        .populate({
          path: "mealType",
          populate: {
            path: "breakfast lunch dinner snacks",
            model: "Recipe",
          },
        })
        .then((meal) => {
          console.log("recipe", meal.mealtype);
          res.status(200).json(meal);
        });
    })
    .catch(next);
};

module.exports.addMeal = (req, res, next) => {
  Recipe.create(req.body)
    .then((recipe) => {
      console.log("recipe1", recipe);
      let day = recipe.date;
      let start = new Date(day);
      start.setHours(0, 0, 0, 0);

      let end = new Date(day);
      end.setHours(23, 59, 59, 599);

      console.log("day", day);
      console.log("start", start);
      console.log("end", end);

      Diary.findOne({
        $and: [{ date: { $gte: start } }, { date: { $lte: end } }],
      }).then((diary) => {
        if (diary) {
          let day = recipe.date;

          let start = new Date(day);
          start.setHours(0, 0, 0, 0);

          let end = new Date(day);
          end.setHours(23, 59, 59, 599);

          console.log("if");
          switch (
            recipe.mealType[0] //En front gestionar respuesta de la API en mealType
          ) {
            case "breakfast":
              console.log("recipe2", recipe);
              console.log("diary.meal", diary.meal);

              Meal.findOne({
                $and: [{ date: { $gte: start } }, { date: { $lte: end } }],
              }).then((meal) => {
                console.log("meal before breakfast", meal);
                meal.mealType.breakfast = recipe._id;
                return meal.save().then((meal) => res.status(201).json(meal));
              });
              break;
            case "lunch":
              Meal.findOne({
                $and: [{ date: { $gte: start } }, { date: { $lte: end } }],
              }).then((meal) => {
                console.log("meal before lunch", meal);
                meal.mealType.lunch = recipe._id;
                return meal.save().then((meal) => res.status(201).json(meal));
              });
              break;
            case "dinner":
              Meal.findOne({
                $and: [{ date: { $gte: start } }, { date: { $lte: end } }],
              }).then((meal) => {
                console.log("meal before dinner", meal);
                meal.mealType.dinner = recipe._id;
                return meal.save().then((meal) => res.status(201).json(meal));
              });
              break;
            case "snacks":
              Meal.findOne({
                $and: [{ date: { $gte: start } }, { date: { $lte: end } }],
              }).then((meal) => {
                console.log("meal before snacks", meal);
                meal.mealType.snacks = recipe._id;
                return meal.save().then((meal) => res.status(201).json(meal));
              });
              break;
            default:
              console.log("default");
              res.status(304).json({ meal });
              break;
          }
        } else {
          console.log("else");
          console.log("last recipe", recipe);
          switch (recipe.mealType[0]) {
            case "breakfast":
              Meal.create({
                mealType: {
                  breakfast: recipe.id,
                  lunch: null,
                  dinner: null,
                  snacks: null,
                },
                date: recipe.date,
              }).then((meal) => {
                console.log("meal", meal);
                Sport.create({
                  chronometer: {
                    startTime: null,
                    endTime: null,
                  },
                  caloriesBurned: 0,
                  distance: 0,
                  date: recipe.date,
                }).then((sport) => {
                  Diary.create({
                    sport: sport.id,
                    meal: meal._id,
                    user: req.currentUser,
                    date: day,
                  })
                    .then((diary) => {
                      console.log("Diary created", diary);
                      res.status(200).json(diary);
                    })
                    .catch(next);
                });
              });
              break;
            case "lunch":
              Meal.create({
                mealType: {
                  breakfast: null,
                  lunch: recipe.id,
                  dinner: null,
                  snacks: null,
                },
                date: recipe.date,
              }).then((meal) => {
                console.log("meal", meal);
                Sport.create({
                  chronometer: { startTime: null, endTime: null },
                  caloriesBurned: 0,
                  distance: 0,
                  date: recipe.date,
                }).then((sport) => {
                  Diary.create({
                    sport: sport.id,
                    meal: meal._id,
                    user: req.currentUser,
                    date: day,
                  })
                    .then((diary) => {
                      console.log("Diary created", diary);
                      res.status(200).json(diary);
                    })
                    .catch(next);
                });
              });
              break;
            case "dinner":
              Meal.create({
                mealType: {
                  breakfast: null,
                  lunch: null,
                  dinner: recipe.id,
                  snacks: null,
                },
                date: recipe.date,
              }).then((meal) => {
                console.log("meal", meal);
                Sport.create({
                  chronometer: { startTime: null, endTime: null },
                  caloriesBurned: 0,
                  distance: 0,
                  date: recipe.date,
                }).then((sport) => {
                  Diary.create({
                    sport: sport.id,
                    meal: meal._id,
                    user: req.currentUser,
                    date: day,
                  })
                    .then((diary) => {
                      console.log("Diary created", diary);
                      res.status(200).json(diary);
                    })
                    .catch(next);
                });
              });
              break;
            case "snacks":
              Meal.create({
                mealType: {
                  breakfast: null,
                  lunch: null,
                  dinner: null,
                  snacks: recipe.id,
                },
                date: recipe.date,
              }).then((meal) => {
                console.log("meal", meal);
                Sport.create({
                  chronometer: { startTime: null, endTime: null },
                  caloriesBurned: 0,
                  distance: 0,
                  date: recipe.date,
                }).then((sport) => {
                  Diary.create({
                    sport: sport.id,
                    meal: meal._id,
                    user: req.currentUser,
                    date: day,
                  })
                    .then((diary) => {
                      console.log("Diary created", diary);
                      res.status(200).json(diary);
                    })
                    .catch(next);
                });
              });
              break;
            default:
              console.log("default else meal");
              break;
          }
        }
      });
    })
    .catch(next);
};

module.exports.editMeal = (req, res, next) => {
  let start = new Date(req.query.date);
  start.setHours(0, 0, 0, 0);

  let end = new Date(req.query.date);
  end.setHours(23, 59, 59, 599);

  let mealType = req.query.mealType;

  Meal.findOne({
    $and: [
      {
        date: {
          $gte: start,
        },
      },
      {
        date: {
          $lte: end,
        },
      },
    ],
  })
    .then((meal) => {
      meal.mealType[mealType] = null;
      return meal.save().then((meal) => {
        return (
          meal
            .populate("mealType")
            // .populate('breakfast lunch dinner snacks')
            .populate({
              path: "mealType",
              populate: {
                path: "breakfast lunch dinner snacks",
                model: "Recipe",
              },
            })
            .execPopulate()
            .then((meal) => {
              res.status(200).json(meal);
            })
        );
      });
    })
    .catch(next);
};

module.exports.deleteMeal = (req, res, next) => {
  Diary.findById(req.params.id)
    .then((diary) => {
      Meal.findOne(diary.meal)
        .then((meal) => {
          Recipe.findByIdAndDelete(meal.mealType.breakfast)
            .then((recipe) => {
              //console.log('breakfast', recipe)
              console.log("breakfast deleted");
              //res.status(200).json({})
            })
            .catch(next);

          Recipe.findByIdAndDelete(meal.mealType.lunch)
            .then((recipe) => {
              //console.log('Lunch', recipe)
              console.log("lunch deleted");
              //res.status(200).json({})
            })
            .catch(next);

          Recipe.findByIdAndDelete(meal.mealType.dinner)
            .then((recipe) => {
              //console.log('dinner', recipe)
              console.log("dinner deleted");
              //res.status(200).json({})
            })
            .catch(next);

          Recipe.findByIdAndDelete(meal.mealType.snacks)
            .then((recipe) => {
              //console.log('snacks', recipe)
              console.log("snacks deleted");
              //res.status(200).json({})
            })
            .catch(next);
        })
        .then(() => {
          Meal.findByIdAndDelete(diary.meal)
            .then((meal) => {
              //console.log('meal', meal)
              console.log("Meal deleted");
              //res.status(200).json({})
            })
            .catch(next);
        })
        .catch(next);

      Diary.findByIdAndUpdate(
        diary._id,
        {
          meal: null,
        },
        {
          new: true,
        }
      )
        .then((diary) => {
          console.log("diary updated", diary);
          res.status(204).json(diary);
        })
        .catch(next);
    })
    .catch(next);
};
