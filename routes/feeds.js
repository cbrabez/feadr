var express = require("express");
var router = express.Router();
let Parser = require('rss-parser');
var Feed = require("../models/feed");
let parser = new Parser();


async function parseFeed(feed) {
  return parser.parseURL(feed).then(parsedFeed => { return parsedFeed });
}

router.get("/", function(req, res) {
  
});    

router.get("/:id", function(req, res){
   //Get feedItems for selected feedID
  Feed.find({}).exec(function(err, allFeeds) {
    if(err){
        console.log(err);
    }  else {
            Feed.find({_id: req.params.id}).exec(function(err, selectedFeed) {       
               if(err){
                   console.log(err);
               } else{
               let feed = parseFeed(selectedFeed[0].feedUrl);
               feed.then(function(parsedFeed){
                   res.render("feeds/feeds", {feed: parsedFeed, feeds: allFeeds});
               });
               }
            });
        }
    });
});

router.post("/", function(req, res){
   var feedTitle    = req.body.feedTitle;
   var feedUrl      = req.body.feedUrl;
   let newFeed = {feedTitle: feedTitle, feedUrl: feedUrl};
   Feed.create(newFeed, function(err, newlyCreated){
       if(err){
           console.log(err);
       }else{
           res.redirect("/feeds");
       }
   });
});

module.exports = router;