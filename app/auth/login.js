const path = require('path');
const passport = require('passport');

exports.init = app => {
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
};
