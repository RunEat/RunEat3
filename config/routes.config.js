const express = require('express');
const router = express.Router();
//const miscController = require('../controllers/misc.controllers');
const userController = require('../controllers/users.controller');
const diaryController = require('../controllers/diary.controller');
const mealController = require('../controllers/meal.controller');
const sportController = require('../controllers/sport.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Misc Route
// router.get('/', miscController.home)

// USER ROUTES
router.post('/user/login', usersController.login);
router.post('/user/signup', usersController.signup);
// router.post('/auth/upload', authMiddleware.isAuthenticated, usersController.upload);
router.put('/user/edit', authMiddleware.isAuthenticated, usersController.edit);
router.get('/user/profile', authMiddleware.isAuthenticated, usersController.profile);
router.post('/user/delete', authMiddleware.isAuthenticated, usersController.delete);

// DIARY ROUTES
router.get('/diary', authMiddleware.isAuthenticated, diaryController.getDiary) // List
// Create - Created once either a meal or a sport is created
// Update - No direct update
router.post('/diary/delete/:id', authMiddleware.isAuthenticated, diaryController.getDiary) // Delete

// SPORT ROUTES
// List - No list
router.post('/diary/sport', authMiddleware.isAuthenticated, sportController.addSport) // Create
// Update - No update
router.post('/diary/sport/delete/:id', authMiddleware.isAuthenticated, sportController.deleteSport) // Delete

// MEAL ROUTES
router.get('/diary/meal', authMiddleware.isAuthenticated, mealController.getMeal) // List
router.post('/diary/meal', authMiddleware.isAuthenticated, mealController.addMeal) // Create
router.put('/diary/meal/edit/:id', authMiddleware.isAuthenticated, mealController.editMeal) // Update
router.post('/diary/meal/delete/:id', authMiddleware.isAuthenticated, mealController.deleteMeal) // Delete

module.exports = router;