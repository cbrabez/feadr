var express = require('express');
//var passport = require('passport');
var Feed = require('../models/feed');
var router = express.Router();
let Parser = require('rss-parser');
let parser = new Parser();

router.get('/', function (req, res) {
    Feed.find({}).sort({'_id': -1}).lean().exec(function(err, feeds){
        if(err){
            console.log(err);
        }else{
            console.log(feeds)
            res.render('feeds/overview', {feeds: feeds});    
        }
    });
    
});

router.get('/:id', function (req, res) {
    Feed.find({}).sort({'_id': -1}).lean().exec(function(err, feeds){
        if(err){console.log(err)}
        else{
            Feed.find({"_id": req.params.id}).lean().exec(function(err, feed) {   
                if(err){
                   console.log(err);
                        } else{
                        console.log(feed);
                        res.render("feeds/feed", {feeds: feeds, feed: feed});
                        }
            });
        }
    });
});

router.post('/', function (req, res) {
    var feedUrl = req.body.feedUrl;
    var newFeed = {feedUrl: feedUrl};
    Feed.create(newFeed, function (err, feed) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            //res.set('Content-Type', 'text/html');
            //res.status(200).send('<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/feeds"></head></html>');
            res.redirect("feeds/"+feed._id);
            });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    
    let feedUrl = req.body.feedUrl;
    async function refreshFeed (feedUrl){
        let feedItems = [];
        let feed = await parser.parseURL(feedUrl);
        //console.log(feed.title);
        //feed.items.forEach(item => {
        //console.log(item.title + ':' + item.link);
        //});
        feedItems = feed.items;
        console.log("feedItems added");
    
        Feed.findByIdAndUpdate(req.body.feedId, {$set: {feedTitle: feed.title, items: feedItems}}, {new: true}, function (err, feed) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(feed);
        //res.set('Content-Type', 'text/html');
        //res.status(200).send('<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url="/feeds/'+req.body.feedId+'"></head></html>');
    });
    }
    refreshFeed(feedUrl);
    
});


  


module.exports = router;