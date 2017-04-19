var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var moment = require('moment');
var index = require('./routes/index');
var users = require('./routes/users');
var goals = require('./routes/smartgoals');
mongoose.connect('mongodb://localhost:27017/smartgoals');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(favicon(path.join(__dirname, 'public', './components/img/favicon.ico')));//favicon setup
console.log("START OF USE STATEMENTS");
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());
//static pathing
app.use(express.static(path.join(__dirname, 'public')));
app.use('/ui-router', express.static(__dirname + '/node_modules/angular-ui-router/release/'));
app.use('/ang-jwt', express.static(__dirname + '/node_modules/angular-jwt/dist/'));
app.use('/lock', express.static(__dirname + '/node_modules/angular-lock/dist'));
app.use('/ang', express.static(__dirname + '/node_modules/angular/'));
app.use('/boots', express.static(__dirname + '/node_modules/bootstrap/dist/js/'));
app.use('/jq', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/ang-flash', express.static(__dirname + '/node_modules/angular-flash-alert/dist/'));
app.use('/moment', express.static(__dirname + '/node_modules/moment/'));
app.use('/bootstrap3-dialog', express.static(__dirname + '/node_modules/bootstrap3-dialog/dist/'));

app.use('/angularjs-datepicker', express.static(__dirname + '/node_modules/angularjs-datepicker'));


//middleware to ensure user_token and user_id match for ALL PATHS BUT /users. Also extracts the user_id and ties it to res.locals.user_id
app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    if (req.path !== '/users/' && req.path !== '/users' && !req.path.startsWith('width')) {
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
function verifyUser(request, response, callback) {
    var UserSchema = require('./models/user.js');// UserSchema -----------
    UserSchema.findOne({
        user_token: request.get("Authorization")
    }, function(err, user) {
        if (err) { //handle this better
            response.sendStatus(500);
        }else if (user) {
            response.locals.user_id = user.user_id;
            callback(true);//VALID KEY
        } else {
            callback(false);//INVALID KEY
        }
    });
}

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
