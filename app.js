const express = require('express');
var app         = express();
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var    seedDB      = require("./seeds");
var mongoose    = require("mongoose");

var indexRoutes       = require("./routes/index"),
    feedRoutes         = require("./routes/feeds");
mongoose.connect("mongodb://dev:internet123456@ds151596.mlab.com:51596/feadr");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//seedDB(); // seeding the database

app.use("/", indexRoutes);
app.use("/feeds", feedRoutes);

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