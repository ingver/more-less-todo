const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const redisStore = require('connect-redis')(session);

const config = require('./config');
const app = express();


app.set('env', process.env.NODE_ENV || 'development');

// force SSL
if (app.get('env') === 'production') {
    app.use(forceSSL);
}

// view engine setup
app.set('views', __dirname);
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '..', 'node_modules')));

app.use(session({
    name: 'more-less-todo-session',
    store: new redisStore({
        url: config.redisStore.url
    }),
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false
}));

// authentication
require(path.join(__dirname, 'auth')).init(app);

// todo
require(path.join(__dirname, 'todo')).init(app);

// user
require(path.join(__dirname, 'user')).init(app);


// main page
app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'main'), {
        user: req.user
    });
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers
if (app.get('env') === 'development') {
    // development error handler
    // will print stacktrace
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {
    // production error handler
    // no stacktraces leaked to user
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

// middle-ware for forcing SSL
function forceSSL(req, res, next) {
    if(req.headers['x-forwarded-proto'] != 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
}

module.exports = app;
