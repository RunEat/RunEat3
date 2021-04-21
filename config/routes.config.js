const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const diaryController = require('../controllers/diary.controller');
const mealController = require('../controllers/meal.controller');
const sportController = require('../controllers/sport.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// USER ROUTES
// Signup
router.post('/user/signup', userController.signup);
router.get('/user/activate/:token', userController.activate);
// Login
router.post('/user/login', userController.login);
// Update user and delete account
router.put('/user/edit', authMiddleware.isAuthenticated, userController.edit);
// router.post('/auth/upload', authMiddleware.isAuthenticated, usersController.upload);
router.get('/user/profile', authMiddleware.isAuthenticated, userController.profile);
router.post('/user/delete', authMiddleware.isAuthenticated, userController.delete);
// Password Recovery
router.post('/user/password_reset', userController.sendPasswordReset); // Post sending user Id
router.get('/user/password_reset/:token', userController.updatePassword); // Token associatd with the user id
router.put('/user/password_reset', userController.doUpdatePassword); // If token matches updates password

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