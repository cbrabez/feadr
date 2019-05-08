var mongoose = require("mongoose");

var entrySchema = mongoose.Schema({
   title: String,
   link: String,
   pubDate: Date,
   content: String,
   contentSnippet: String,
   guid: String
 });

module.exports = mongoose.model("Entry", entrySchema);   