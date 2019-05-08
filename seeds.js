var mongoose = require("mongoose");
var Feed = require("./models/feed");
var Entry = require("./models/entry");

var feeds = [
    {
        feedTitle: "Daring Fireball",
        feedUrl:   "https://daringfireball.net/feeds/main"
    },
    {
        feedTitle: "SPOX NFL",
        feedUrl: "http://www.spox.com/pub/rss/us-sport-nfl.xml"
    },  
    {
        feedTitle: "NodeSource",
        feedUrl:    "https://nodesource.com/blog/rss"
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