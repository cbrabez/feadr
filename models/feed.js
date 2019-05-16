var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Feed = new Schema({
    feedTitle: String,
    feedUrl: String,
    items:  [{
            title:            String,
            link:             String,
            pubDate:          Date,
            creator:          String,
            content:          String,
            contentSnippet:   String,
            guid:             String
            }]
});

Feed.plugin(passportLocalMongoose);

module.exports = mongoose.model('Feed', Feed);