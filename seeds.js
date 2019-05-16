var mongoose = require("mongoose");
var Feed = require('./models/feed');

var feeds = [
    {
        feedTitle: "Daring Fireball",
        feedUrl:   "https://daringfireball.net/feeds/main",
        items:  
            [
                {
                title: 'I havent read John Gruber for a long time!' ,
                link: 'https://www.reddit.com/r/funny/comments/3skxqc/the_water_is_too_deep_so_he_improvises/',
                pubDate: 'Thu, 10 Nov 2015 21:16:39 +0000',
                creator: "John Gruber",
                content: '<a href="http://example.com">this is a link</a> &amp; <b>this is bold text</b>',
                contentSnippet: 'this is a link & this is bold text',
                guid: 'https://www.reddit.com/r/funny/comments/3skxqc/the_water_is_too_deep_so_he_improvises/'
                },
                 {
                title: 'This is the second item of the feed!' ,
                link: 'https://www.reddit.com/r/funny/comments/3skxqc/the_water_is_too_deep_so_he_improvises/',
                pubDate: 'Thu, 10 Nov 2015 21:16:39 +0000',
                creator: "John Gruber",
                content: '<a href="http://example.com">this is a link</a> &amp; <b>this is bold text</b>',
                contentSnippet: 'this is a link & this is bold text',
                guid: 'https://www.reddit.com/r/funny/comments/3skxqc/the_water_is_too_deep_so_he_improvises/'
                }
            ]
    },
    {
        feedTitle: "SPOX NFL",
        feedUrl: "http://www.spox.com/pub/rss/us-sport-nfl.xml",
         items:  [{
                title: 'The water is waaaaayyyy too deep, so he improvises',
                link: 'https://www.reddit.com/r/funny/comments/3skxqc/the_water_is_too_deep_so_he_improvises/',
                pubDate: 'Thu, 11 Nov 2015 21:16:39 +0000',
                creator: "Chris Kohler",
                content: '<a href="http://example.com">this is a link</a> &amp; <b>this is bold text</b>',
                contentSnippet: 'this is a link & this is bold text',
                guid: 'https://www.reddit.com/r/funny/comments/3skxqc/the_water_is_too_deep_so_he_improvises/'
                }]
    },  
    {
        feedTitle: "NodeSource",
        feedUrl:    "https://nodesource.com/blog/rss",
        items:  [{
                title: 'The water is too deep, so he improvises',
                link: 'https://www.reddit.com/r/funny/comments/3skxqc/the_water_is_too_deep_so_he_improvises/',
                pubDate: 'Thu, 12 Nov 2015 21:16:39 +0000',
                creator: "John Doe",
                content: '<a href="http://example.com">this is a link</a> &amp; <b>this is bold text</b>',
                contentSnippet: 'this is a link & this is bold text',
                guid: 'https://www.reddit.com/r/funny/comments/3skxqc/the_water_is_too_deep_so_he_improvises/'
                }]
        
    }
];

function seedDB(){
    // Remove all campgrounds
    Feed.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed feeds!");
        
        // add a few campgrounds
        feeds.forEach(function(seed){
            Feed.create(seed, function(err, feed){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a feed");
                    feed.save();
                }
                        
            });  
        });
    });  
    /*
    Project.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed projects!")
        
        // add a few campgrounds
        projects.forEach(function(seed){
            Project.create(seed, function(err, project){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a project");
                    project.save();
                }
                        
            });  
        });
    }); 
    */
}

module.exports = seedDB;