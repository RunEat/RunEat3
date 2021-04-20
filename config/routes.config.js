const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const diaryController = require('../controllers/diary.controller');
const mealController = require('../controllers/meal.controller');
const sportController = require('../controllers/sport.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// USER ROUTES
router.post('/user/login', userController.login);
router.post('/user/signup', userController.signup);
// router.post('/auth/upload', authMiddleware.isAuthenticated, usersController.upload);
router.put('/user/edit', authMiddleware.isAuthenticated, userController.edit);
router.get('/user/profile', authMiddleware.isAuthenticated, userController.profile);
router.post('/user/delete', authMiddleware.isAuthenticated, userController.delete);

// DIARY ROUTES
router.get('/diary', authMiddleware.isAuthenticated, diaryController.getDiary) // List
// Create - Created once either a meal or a sport is created
// Update - No direct update
router.delete('/diary/:id', authMiddleware.isAuthenticated, diaryController.deleteDiary) // Delete

// SPORT ROUTES
// List - No list
router.post('/diary/sport', authMiddleware.isAuthenticated, sportController.addSport) // Create
// Update - No update
router.post('/diary/sport/delete/:id', authMiddleware.isAuthenticated, sportController.deleteSport) // Delete

// MEAL ROUTES
router.get('/diary/meal', authMiddleware.isAuthenticated, mealController.getMeal) // List
router.post('/diary/meal', authMiddleware.isAuthenticated, mealController.addMeal) // Create
router.put('/diary/meal/edit', authMiddleware.isAuthenticated, mealController.editMeal) // Update
router.post('/diary/meal/delete', authMiddleware.isAuthenticated, mealController.deleteMeal) // Delete

module.exports = router;