//current loggedIn user saves in req.user property
const passport = require('passport')
const isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.flash("success", "you need to login first");
        return res.redirect('/user/login');
    }
    next();
}

module.exports = isLoggedIn;