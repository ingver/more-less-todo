const passport = require('passport');
const path = require('path');
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

    setRoutes(app);
}

function setRoutes(app) {
    app.get('/login', (req, res) => {
        if (req.isAuthenticated()) {
            return res.redirect('/u');
        }
        res.render(path.join(__dirname, 'login'));
    });

    app.post('/login',
        passport.authenticate('local', {
            successReturnToOrRedirect: '/u',
            failureRedirect: '/login'
        })
    );

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
}

exports.init = initAuth;
