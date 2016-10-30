const path = require('path');
const passport = require('passport');
const pg = require('pg');

const connStr = require('../config').dbConnStr;

exports.init = app => {
    app.get('/register', (req, res) => {
        if (req.isAuthenticated()) {
            return res.redirect('/u');
        }
        res.render(path.join(__dirname, 'templates', 'register'));
    });

    app.post('/register', (req, res) => {
        const { username, email, password } = req.body;
        console.log(username, email, password);

        pg.connect(connStr, (err, client, done) => {
            if (err) {
                done();
                console.error(err);
                return res.redirect('/');
            }

            client.query(`INSERT INTO users(name, email, password)
                          VALUES ($1, $2, $3)`,
                         [username, email, password])
                .then(() => {
                    console.log('success');
                    done();
                    passport.authenticate('local')(req, res,
                        () => res.redirect('/'));
                })
                .catch(err => {
                    done();
                    console.error(err);
                    res.redirect('/');
                });
        });
    });
};
