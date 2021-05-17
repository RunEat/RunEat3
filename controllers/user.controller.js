const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { sendActivationEmail } = require("../config/mailer.config");
const { sendPasswordRecoveryEmail } = require("../config/mailer.config");
const { v4: uuidv4 } = require("uuid");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  "133783976566-p3ilg93e7mlemi931s14n0aboa0ar9uk.apps.googleusercontent.com"
);

module.exports.login = (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username: username, active: true })
    .then((user) => {
      if (!user) {
        next(
          createError(404, {
            errors: { username: "Username or password are not valid." },
          })
        );
      } else {
        return user.checkPassword(password).then((match) => {
          if (!match) {
            next(
              createError(404, {
                errors: { username: "Username or password are not valid." },
              })
            );
          } else {
            res.json({
              access_token: jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET || "JWT Secret - It should be changed",
                {
                  expiresIn: "1d",
                }
              ),
            });
          }
        });
      }
    })
    .catch(next);
};

module.exports.loginGoogle = (req, res, next) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "133783976566-p3ilg93e7mlemi931s14n0aboa0ar9uk.apps.googleusercontent.com",
    })
    .then((response) => {
      //console.log("response", response);
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            createError(404, {
              errors: { email: "Something went wrong..." },
            });
          } else {
            if (user) {
              const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
              });
              const { _id, name, email, active } = user;
              res.json({
                token,
                user: { _id, name, email: true },
              });
            } else {
              let password = email + process.env.JWT_SECRET;
              let newUser = new User({
                username: name,
                email,
                height: 150,
                weight: 60,
                age: 18,
                password,
				active: true,
				activity: 'Sedentary'
              });
              console.log("newUser", newUser);
				console.log("response", response);
				const token = jwt.sign(
                      { id: newUser._id },
                      process.env.JWT_SECRET,
                      {
                        expiresIn: "1d",
                      }
                    );
              return newUser.save().then((newUserSave) =>
                //const { _id, name, email } = newUserSave;
                res.json({
                  token,
                  user: { newUserSave },
                })
              );
            }
          }
        });
      }
    });
  console.log();
};

module.exports.signup = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        next(
          createError(400, {
            errors: { username: "This username already exists." },
          })
        );
      } else {
        return User.create(req.body).then((createdUser) => {
          console.log("createdUser (l45 user.controller): ", createdUser);
          sendActivationEmail(createdUser.email, createdUser.token);
          res.status(201).send(`Activation Email Sent to ${createdUser.email}`); // TODO -> Modify
        });
      }
    })
    .catch(next);
};

module.exports.activate = (req, res, next) => {
  User.findOneAndUpdate(
    {
      token: req.params.token,
      active: false,
    },
    {
      active: true,
      token: uuidv4(),
    }
  )
    .then((activeUser) => {
      console.log("activeUser (l61 user.controller): ", activeUser);
      activeUser ? res.status(200).json(activeUser) : res.status(400).json({});
    })
    .catch(next);
};

module.exports.edit = (req, res, next) => {
  console.log("req.body edit", req.body);
  //console.log('req.body.id', req.body.id)

  console.log("req.file", req.file);
  //req.body.id = req.currentUser;

  if (req.file) {
    req.body.avatar = req.file.path;
  }

  console.log("req.currentUser", req.currentUser);

  User.findOne({ _id: req.currentUser })
    .then((user) => {
      console.log("user", user);
      if (!user) {
        next(createError(404));
        return;
      }

      Object.entries(req.body).forEach(([key, value]) => {
        // For each body element it creates a key value pair
        user[key] = value;
      });

      return user.save().then(() => res.json(user));
    })
    .catch(next);
};

// Logout handled from the frontEnd
// module.exports.logout = (req, res, next) => {
// 	if(!currentUser) {
// 		res.send('Logged Out')
// 	}
// }

module.exports.profile = (req, res, next) => {
  User.findById(req.currentUser)
    .then((user) => {
      if (!user) {
        next(createError(404, "User not found"));
      } else {
        res.json(user);
      }
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  console.log(req.currentUser);
  User.findByIdAndDelete(req.currentUser)
    .then(() => {
      res.status(204).json({});
    })
    .catch((err) => next(err));
};

module.exports.sendPasswordReset = (req, res, next) => {
  console.log("req.body", req.body);
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        //next(createError(400, { errors: { email: 'Error.' } }))
        res
          .status(200)
          .send(
            "If your email address is in our database you will get a recovery email."
          ); // Email sent confirmation
      } else {
        sendPasswordRecoveryEmail(user.email, user.token);
        res
          .status(200)
          .send(
            "If your email address is in our database you will get a recovery email."
          ); // TODO -> Modify
      }
    })
    .catch(next);
};

module.exports.updatePassword = (req, res, next) => {
  console.log("req.params.token", req.params.token);
  User.findOne({ token: req.params.token, active: true })
    .then((user) => {
      res.json({
        access_token: jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET || "JWT Secret - It should be changed",
          {
            expiresIn: "90s",
          }
        ),
      });
    })
    .catch(next);
};

module.exports.doUpdatePassword = (req, res, next) => {
  console.log("req.currentUser", req.currentUser);
  User.findOne({ _id: req.currentUser })
    .then((user) => {
      console.log("user", user);
      console.log("req.currentUser", req.currentUser);
      if (!user) {
        next(createError(403, "Forbidden"));
        return;
      }
      user.token = uuidv4();
      user.password = req.body.password;

      return user.save().then(() => res.json({}));
    })
    .catch(next);
};
