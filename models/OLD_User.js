// User.js
var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String,
  feed:
        [{url : String, title : String}]
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');