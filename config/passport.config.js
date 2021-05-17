const passport = requiere("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(
  "google-auth",
  new GoogleStrategy(
    {
      clientID: process.env.G_CLIENT_ID,
      clientSecret: process.env.G_CLIENT_SECRET,
      callbackURL: process.env.G_REDIRECT_URI || "/authenticate/google/cb",
    },
    (accessToken, refreshToken, profile, next) => {
      const googleID = profile.id;
      const email = profile.emails[0] ? profile.emails[0].value : undefined;
      const imgProfile = profile.photos[0].value;

      if (googleID && email) {
        User.findOne({
          $or: [{ email: email }, { "social.google": googleID }],
        })
          .then((user) => {
            /* next(null, false, { error: "Registrate y activa tu cuenta aceptando el correo de confirmacion" }) */
            if (!user) {
              const newUserInstance = new User({
                email,
                imgProfile,
                password: "Aa1" + mongoose.Types.ObjectId(),
                social: {
                  google: googleID,
                },
                active: true,
              });

              return newUserInstance
                .save()
                .then((newUser) => next(null, newUser));
            } else {
              next(null, user);
            }
          })
          .catch(next);
      } else {
        next(null, null, { error: "Error conectando con Google OAuth" });
      }
    }
  )
);
