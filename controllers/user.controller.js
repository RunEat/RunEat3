const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { sendActivationEmail } = require('../config/mailer.config');
const { generatePasswordRecoveryTemplate } = require('../config/mailer.config');
const { v4: uuidv4 } = require('uuid');

module.exports.login = (req, res, next) => {
	const { username, password } = req.body

	User.findOne({ username: username, active: true })
		.then(user => {
			if (!user) {
			next(createError(404, { errors: { username: 'username or password are not valid'} }))
			} else {
			return user.checkPassword(password)
				.then(match => {
				if (!match) {
					next(createError(404, { errors: { username: 'username or password are not valid'} }))
				} else {
					res.json({
					access_token: jwt.sign(
						{ id: user._id },
						process.env.JWT_SECRET || 'JWT Secret - It should be changed',
						{
						expiresIn: '1d'
						}
					)
					})
				}
				})
			}
			})
		.catch(next)
}

module.exports.signup = (req, res, next) => {
	User.findOne({ username: req.body.username })
		.then(user => {
			if (user) {
				next(createError(400, { errors: { username: 'This username already exists.' } }))
			} else {
				return User.create(req.body)
					.then(createdUser => {
						console.log('createdUser (l45 user.controller): ', createdUser)
						sendActivationEmail(createdUser.email, createdUser.token)
						res.status(201)
					})
			}
		})
		.catch(next)
}

module.exports.activate = (req, res, next) => {
	User.findOneAndUpdate({ 
			token: req.params.token, active: false 
		}, {
			active: true, token: uuidv4()
		})
		.then(activeUser => {
			console.log('activeUser (l61 user.controller): ', activeUser)
			activeUser ? res.status(200).json(activeUser) : res.status(400).json({})
		})
		.catch(next);
}

module.exports.upload = (req, res, next) => {

}

module.exports.edit = (req, res, next) => {
	console.log('req.body edit', req.body)
	console.log('req.body.id', req.body.id)

	//req.body.id = req.currentUser;

	console.log('req.currentUser', req.currentUser)

	User.findOne({'_id': req.currentUser})
		.then(user => {
			console.log('user', user)
			if(!user) {
				next(createError(404));
				return;
			}
			// A bit redundant since the route is protected
			// if(user.toString() !== req.currentUser.toString()) {
			// 	next(createError(403));
			// 	return;
			// }

			Object.entries(req.body).forEach(([key, value]) => { // For each body element it creates a key value pair
				user[key] = value;
			});

			return user.save().then(() => res.json({}));
		})
		.catch(next);
}

// Logout handled from the frontEnd
// module.exports.logout = (req, res, next) => {
// 	if(!currentUser) {
// 		res.send('Logged Out')
// 	}
// }

module.exports.profile = (req, res, next) => {
	User.findById(req.currentUser)
		.then(user => {
			if(!user) {
				next(createERROR(404, 'User not found'))
			} else {
				res.json(user)
			}
		})
}

module.exports.delete = (req, res, next) => {
    User.findByIdAndDelete(req.currentUser)
      .then(() => {
        res.status(204).json({})
      })
      .catch((err) => next(err))
}