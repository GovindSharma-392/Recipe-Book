const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
        required: true,
        trim: true
    },
    dish:{
        type: String,
        required: true,
        trim: true
    },
    cuisine:{
        type: String,
        required: true,
        trim: true
    },
    diet:{
        type: String,
        required: true
    },
    ingredients: {
        type: [String], 
        required: true,
        default: []
    },
    mealType:{
        type: String,
        required: true,
        trim: true
    },
    numPeople:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    steps: {
        type: [String], 
        required: true,
        default: []
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"review"
        }
    ],
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }

});

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe;