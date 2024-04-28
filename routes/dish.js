const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipeSchema');
const User = require('../models/userSchema')
const isLoggedIn = require('../middleware/middleware');


console.log(typeof(isLoggedIn));

router.get('/index', async (req, res) => {
    try {
        const allRecipe = await Recipe.find({});
        res.render('index', { allRecipe });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/show/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id).populate("reviews");;
        const username = req.username;
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }
        res.render('show', { item: recipe}); 
    } catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/addRecipe', isLoggedIn, async (req, res) => {
    try {
       res.render('addRecipe');
    } catch (error) {
        console.error('Error rendering addRecipe form:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/cuisine/:type', isLoggedIn, async (req, res) => {
    const {type} = req.params;
    try {
         // Retrieve cuisine from query parameters
        const cuisineRecipes = await Recipe.find({ cuisine: type});
        res.render('cuisine', { cuisineRecipes: cuisineRecipes });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/mealType/:mealType', isLoggedIn, async(req, res)=>{
    let {mealType} = req.params;
    if( mealType === "main"){
        mealType = "Main Course";
    }
    try {
         // Retrieve cuisine from query parameters
        const RecipeType = await Recipe.find({ mealType: mealType});
        res.render('mealType', { RecipeType: RecipeType });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).send('Internal Server Error');
    }
})
// router.get('/myRecipes' , async(req,res)=>{
//     const {id} = req.params;            
//     const data = await User.findById(req.user.id).populate("myRecipes");
//     res.render("/myRecipes", {data});
// })

router.post('/search', isLoggedIn, async(req,res)=>{
    const { dishName } = req.body;
    
    try{
        const dish = await Recipe.find({ dish: { $regex: dishName, $options: 'i' } });
        console.log(dishName);
        res.render('search', { dish: dish });
    } catch(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/myrecipes', isLoggedIn, async (req, res) => {
    try {
      // Find the current user
      const user = await User.findById(req.user._id);
  
      // Fetch only the recipes uploaded by the user
      const recipes = await Recipe.find({ uploader: user._id });
        
      // Render the cart view with the fetched recipes
      res.render('myRecipes', { recipes });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });




router.get('/allrecipe',isLoggedIn, async (req, res) => {
    try {
        const allRecipe = await Recipe.find({});
        res.render('allrecipe', { allRecipe });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/foodName/:name', isLoggedIn, async (req, res) => {
    const { name } = req.params; // Access the keyword from the URL parameter
    
    try {
        // Search for dishes containing the keyword in their name
        const dishes = await Recipe.find({ dish: { $regex: name, $options: 'i' } });
        
        res.render('foodName', { dishes: dishes }); // Render the view with the retrieved dishes
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});



router.post('/addRecipe', async (req, res) => {
    try {
        await Recipe.create(req.body);
        res.redirect('/dish/index');
    } catch (error) {
        console.error('Error adding recipe:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/updateRecipe/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }
        res.render('updateRecipe', { item: recipe }); 
    } catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/updateRecipe/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Recipe.findByIdAndUpdate(id, req.body);
        res.redirect(`/dish/show/${id}`);
    } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/deleteRecipe/:id', async (req, res) => {
    try {
        await Recipe.deleteOne({ _id: req.params.id });
        res.redirect("/dish/index");
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
