var express = require("express");
var app         = express();
var router = express.Router();

// root route
router.get("/", function(req, res){
    res.render('login');
});

module.exports = router;