const express = require('express');
const router = express.Router();
//const miscController = require('../controllers/misc.controllers');
const usersController = require('../controllers/users.controllers');
const diaryController = require('../controllers/diary.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

//MISC Route
//router.get('/', miscController.home)

// User Routes
router.post('/user/login', usersController.login);
router.post('/user/signup', usersController.signup);
// router.post('/auth/upload', authMiddleware.isAuthenticated, usersController.upload);
router.put('/user/edit', authMiddleware.isAuthenticated, usersController.edit);
//router.post('/auth/logout', authMiddleware.isAuthenticated, usersController.logout); // Handled from the frontEnd
router.get('/user/profile', authMiddleware.isAuthenticated, usersController.profile);
router.post('/user/delete', authMiddleware.isAuthenticated, usersController.delete)


//Diary Routes
router.get('/diary', diaryController.getDiary)
router.post('/diary/sport', diaryController.resultSport)
router.get('/diary/meal', diaryController.getMeal)

module.exports = router;