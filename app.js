const express = require('express');
var app         = express();
var bodyParser  = require("body-parser");
let Parser = require('rss-parser');
var methodOverride = require("method-override");
var    seedDB      = require("./seeds");
var mongoose    = require("mongoose");
var getFeeds = require("./public/scripts/getFeeds");

let parser = new Parser();

var indexRoutes   = require("./routes/index"),
    feedRoutes    = require("./routes/feeds"),
    userRoutes    = require("./routes/UserController"),
    authRoutes    = require("./auth/AuthController");

mongoose.connect("mongodb://dev:internet123456@ds151596.mlab.com:51596/feadr");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//seedDB(); // seeding the database

app.use("/", indexRoutes);
app.use("/feeds", feedRoutes);
app.use('/users', userRoutes);
app.use('/api/auth', authRoutes);

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