const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const diaryController = require('../controllers/diary.controller');
const mealController = require('../controllers/meal.controller');
const sportController = require('../controllers/sport.controller');
const authMiddleware = require('../middlewares/auth.middleware');
//const passport = require('passport')
//require('../config/passport.config')

const upload = require('./storage.config')


// USER ROUTES
// Signup
router.post('/user/signup', userController.signup);
router.get('/user/activate/:token', userController.activate);
// Login
router.post('/user/login', userController.login);
// Update user and delete account
router.put('/user/edit', upload.single('avatar'), authMiddleware.isAuthenticated, userController.edit);
router.get('/user/profile', authMiddleware.isAuthenticated, userController.profile);
router.post('/user/delete', authMiddleware.isAuthenticated, userController.delete);

//GOOGLE AUTH
// router.get('/auth/google', passport.authenticate('google', {
//     session: false,
//     scope: ["profile", "email"],
//     accessType: "offline",
//     approvalPrompt: "force"
// }));
// router.get('/auth/google/callback', passport.authenticate('google', { session: false }), userController.loginGoogle)
// router.get('/verify', authMiddleware.isAuthenticated)  //POSTMAN

// Password Recovery
router.post('/user/password_reset', userController.sendPasswordReset); // Post sending user Id
router.get('/user/password_reset/:token', userController.updatePassword); // Token associatd with the user id
router.put('/user/password_reset', authMiddleware.isAuthenticated, userController.doUpdatePassword); // If token matches updates password

// DIARY ROUTES
router.get('/diary', authMiddleware.isAuthenticated, diaryController.getDiary) // List
// Create - Created once either a meal or a sport is created
// Update - No direct update
router.delete('/diary/:id', authMiddleware.isAuthenticated, diaryController.deleteDiary) // Delete

// SPORT ROUTES
// List - No list
router.post('/diary/sport', authMiddleware.isAuthenticated, sportController.addSport) // Create
// Update - No update
router.delete('/diary/sport/:id', authMiddleware.isAuthenticated, sportController.deleteSport) // Delete

// MEAL ROUTES
router.get('/diary/meal', authMiddleware.isAuthenticated, mealController.getMeal) // List
router.post('/diary/meal', authMiddleware.isAuthenticated, mealController.addMeal) // Create
router.put('/diary/meal/edit', authMiddleware.isAuthenticated, mealController.editMeal) // Update
router.delete('/diary/meal/:id', authMiddleware.isAuthenticated, mealController.deleteMeal) // Delete

module.exports = router;