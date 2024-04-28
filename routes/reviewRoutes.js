const express = require('express');
const Recipe = require('../models/recipeSchema');
const router = express.Router();
const Review = require('../models/review')

router.post('/review/:id',async(req, res) => {
    const id = req.params.id;
    const recipe = await Recipe.findById(id);
    
    const{rating, comment} = req.body;
    // console.log(req.body);
    const review = await Review.create({rating, comment});
    // console.log(review);

    recipe.reviews.push(review);

    await recipe.save();

    res.redirect(`/dish/show/${id}`);
})


router.delete('/review/:id/:recipeId', async(req, res)=>{
    const {id, recipeId} = req.params;

    await Review.findByIdAndDelete(id)

    // res.send(`${id} deleted`)
    res.redirect(`/dish/show/${recipeId}`)
})


module.exports = router;