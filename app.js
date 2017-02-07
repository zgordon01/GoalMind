var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');
var goals = require('./routes/smartgoals');
mongoose.connect('mongodb://localhost:27017/smartgoals');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
console.log("START OF USE STATEMENTS");
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//middleware to ensure user_token and user_id match for ALL PATHS BUT /users
/*app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    if (req.body.user_id && req.get("Authorization")) {
        if (req.path !== '/users/' && req.path !== '/users') {
            verifyUser(req, res, function(isValid) {
                if (isValid) {//VALID CREDENTIALS
                    next();//let express pass control to the next middleware function
                } else {//INVALID CREDENTIALS
                    res.status(401).json({
                        success: false,
                        message: "Incorrect credentials"
                    });
                }
            });
        } else { //this must be the /users route
            next();//let express pass control to the next middleware function
        }
    } else {
        res.status(400).json({
            message: "Must send user_id and user_token"
        });
    }
});*/

app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    if (req.path !== '/users/' && req.path !== '/users') {
        if (req.get("Authorization") === null || req.get("Authorization") === undefined) {
            res.sendStatus(401);
        } else {
            verifyUser(req, res, function(isValid) {
                if (isValid) { //VALID CREDENTIALS
                    next(); //let express pass control to the next middleware function
                } else { //INVALID CREDENTIALS
                    res.sendStatus(401);
                }
            });
        }
    }
    else{
        next();
    }
});

//route configuration
console.log("START OF ROUTE DECLARATIONS");
app.use('/', index);
app.use('/users', users);
app.use('/smartgoals', goals);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

function verifyUser(request, response, callback) {
    var UserSchema = require('./models/user.js');
    UserSchema.findOne({
        user_token: request.get("Authorization")
    }, function(err, user) {
        if (err) { //handle this better
            res.sendStatus(500);
        }else if (user) {
            callback(true);//VALID KEY
        } else {
            callback(false);//INVALID KEY
        }
    });
}

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
