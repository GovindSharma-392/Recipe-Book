const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const dish = require('./routes/dish.js');
const reviewRoutes = require('./routes/reviewRoutes.js')
const methodOverride = require('method-override');
const userRouter = require('./routes/user.js')
const User = require('./models/userSchema.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');
const session = require("express-session");



const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{
      httpOnly:true,
      maxAge: 7 * 24 * 60 * 60 * 1000 * 1
  }
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

app.use((req, res, next)=>{
  // console.log(req.user);
  res.locals.currUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

mongoose.connect("mongodb://127.0.0.1:27017/config").then(() => 
    console.log('MongoDB Connected')
)
  .catch(err => console.log(err));

app.use('/dish', dish);
app.use('/review',reviewRoutes);
app.use('/user', userRouter)



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});