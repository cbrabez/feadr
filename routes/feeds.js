var express = require('express');
//var passport = require('passport');
var Feed = require('../models/feed');
var router = express.Router();
let Parser = require('rss-parser');
let parser = new Parser();

router.get('/', function (req, res) {
    res.render('feeds/overview');
});

router.get('/:id', function (req, res) {
    Feed.find({"_id": req.params.id}).lean().exec(function(err, feed) {   
        if(err){
           console.log(err);
                } else{
                console.log(feed);
                res.render("feeds/feed", {feed: feed});
                }
            });
    //res.render('feeds/feed');
});



router.post('/', function (req, res) {
    Feed.create({
            url : req.body.feedUrl
        }, 
        function (err, feed) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(feed);
        });
});


// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    let feedItems = [];
    async function refreshFeed (feedUrl){
        let feed = await parser.parseURL('https://www.reddit.com/.rss');
        //console.log(feed.title);
        //feed.items.forEach(item => {
        //console.log(item.title + ':' + item.link);
        //});
        feedItems = feed.items;
        console.log(feedItems);
    
        Feed.findByIdAndUpdate(req.body.feedId, {$set: {items: feedItems}}, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
    }
    refreshFeed();
    
});


  


module.exports = router;