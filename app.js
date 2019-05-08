const express = require('express');
var app         = express();
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
const PORT = process.env.PORT || 5000;
var    seedDB      = require("./seeds");
var mongoose    = require("mongoose");
  
const FEED_LIST = [
  'https://css-tricks.com/feed/',
  'https://codepen.io/posts/feed',
  'https://blog.safia.rocks/rss',
  'https://hnrss.org/frontpage',
  'https://tj.ie/feed.rss',
  'http://github-trends.ryotarai.info/rss/github_trends_javascript_daily.rss'
];

var indexRoutes       = require("./routes/index"),
    feedRoutes         = require("./routes/feeds");
mongoose.connect("mongodb://dev:internet123456@ds151596.mlab.com:51596/feadr");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
seedDB(); // seeding the database

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