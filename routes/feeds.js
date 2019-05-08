var express = require("express");
var router = express.Router();
let Parser = require('rss-parser');
var Feed = require("../models/feed");
let parser = new Parser();
var getFeed = require("../helpers/getFeeds");


   async function parseFeed(feed) {
      return parser.parseURL(feed).then(parsedFeed => { return parsedFeed });
    }
    /*(async () => {
        console.log("HEY FROM ASYNC FUNC!")
        var feedItems = await parseFeed(feedUrl);        
        return feedItems;
    })();
    */

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
                   res.render("feeds/feed", {feed: parsedFeed, feeds: allFeeds});
               });
               }
            });
        }
    });
});

module.exports = router;