const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User = require('./user').create();

function initAuth(app) {
    passport.use(new Strategy(
        (username, password, done) => {
            User.findByName(username, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, { message: 'User not found'});
                }

                if (user.password === password) {
                    return done(null, user);
                }

                done(null, false, { message: 'Incorrect username/password'});
            });
        }
    ));

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
        User.findById(id, cb);
    });

    app.use(passport.initialize());
    app.use(passport.session());

    require('./login').init(app);
    require('./register').init(app);
}

exports.init = initAuth;
