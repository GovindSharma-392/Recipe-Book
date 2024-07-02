const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username:String, 
    password:String,
    email:String,
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'recipe' }],

    
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("user", userSchema);

module.exports = User