const passport = require('passport');
const path = require('path');
const Strategy = require('passport-local').Strategy;
const { logReq } = require('../utils');

// single user
const user = {
    name: 'foobar',
    pass: '12345'
};

function findUser(username, cb) {
    if (username ===  user.name) {
        return cb(null, user);
    }

    return cb(null);
}

function initAuth(app) {
    passport.use(new Strategy(
        function(username, password, done) {
            findUser(username, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'User not found'});
                }
                if (user.pass === password) {
                    return done(null, user);
                }
                done(null, false, { message: 'Incorrect username/password'});
            });
        }
    ));

    passport.serializeUser(function(user, cb) {
        cb(null, user.name);
    });
    passport.deserializeUser(function(username, cb) {
        findUser(username, cb);
    });

    app.use(passport.initialize());
    app.use(passport.session());

    setRoutes(app);
}

function setRoutes(app) {
    app.get('/login', function(req, res) {
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

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
}

exports.init = initAuth;
