var mongoose = require("mongoose");

var feedSchema = mongoose.Schema({
   feedTitle: String,
   feedUrl: String
 });

module.exports = mongoose.model("Feed", feedSchema);