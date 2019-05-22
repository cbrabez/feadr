const express = require('express');
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser  = require("body-parser");
let Parser = require('rss-parser');
var methodOverride = require("method-override");
var mongoose    = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var    seedDB      = require("./seeds");

let parser = new Parser();

var indexRoutes   = require("./routes/index"),
    feedRoutes    = require("./routes/feeds");
    //accountRoutes    = require("./routes/account");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
//seedDB(); // seeding the database

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use( function (req, res, next) {
  if ( req.method == 'POST' && req.url == '/login' ) {
    if ( req.body.rememberme ) {
      req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
    } else {
      req.session.cookie.expires = false;
    }
  }
  next();
});

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect("mongodb://dev:internet123456@ds151596.mlab.com:51596/feadr");



app.use("/", indexRoutes);
app.use("/feeds", feedRoutes);
//app.use('/users', accountRoutes);

// Server Setup
/*
// OFFLINE
const port = 3000;

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
*/

// ONLINE
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Feadr Server has started!");
});

module.exports = app;