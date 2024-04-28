const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const passport = require('passport');

// Login route
router.get('/login', (req, res) => {
    res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Signup post route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email });
        await User.register(user, password);
        req.flash("success", `Registration successful. Welcome, ${user.username}!`);
        res.redirect('/user/login');
    } catch (error) {
        req.flash("error", "Failed to register user.");
        res.redirect('/user/signup');
    }
});

// Login post route
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/user/login',
    failureFlash: true
}), (req, res) => {
    req.flash("success", `Welcome back, ${req.user.username}!`);
    res.redirect('/dish/index');
});

// Logout route
router.post('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash("error", "logout successfully")
      res.redirect('/dish/index');
    });
});

module.exports = router;
