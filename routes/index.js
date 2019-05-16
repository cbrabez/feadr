var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('landing');
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

// sign up route
router.post("/register", function(req, res) {
    var newAccount = new Account({username: req.body.username});
    Account.register(newAccount, req.body.password, function(err, account){
        console.log("hey from account register");
        if(err){
            //req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            //req.flash("success", "Welcome to feadR " + account.email);
            res.redirect("/feeds");
        });
    });
});
/*
// CREATES A NEW USER
router.post('/register', function (req, res) {
    Account.create({
            email : req.body.email,
            password : req.body.password
        }, 
        function (err, account) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            //res.status(200).send(user);
            res.status(200).location('feeds/overview').end();
        }
   );
});
*/

/*
router.post('/register', function(req, res) {
    Account.register(new Account({ email : req.body.email, username: req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});
*/

router.get('/login', function(req, res) {
    res.render('login');
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/feeds",
        failureRedirect: "/login"
    }), function(req, res) {
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;