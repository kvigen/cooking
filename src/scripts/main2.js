require.config({
  baseUrl: '../scripts',
  // This isn't ideal. At some point I'll serve the static files with Apache,
  // or something similar
  //urlArgs: "bust=" + (new Date()).getTime()

});

var recipeMenu = undefined;
define(['ingredient', 'recipe2', 'ingredients', 'recipeModel', 'recipeView'],
    function(Ingredient, RecipeMenu, Ingredients, RecipeModel, RecipeView) {

  var ingredient = new Ingredient({"name": "firstRecipe"});
  var ingredient2 = new Ingredient({"name": "secondRecipe"});

  var collection = new Ingredients([ingredient, ingredient2]);
  //console.log("Collection size: " + collection.length);
  //collection.remove(ingredient);

  console.log(collection.get(ingredient2.cid).get("name"));
//  var recipeModel = new RecipeModel({id:4});
//  recipeModel.fetch({
//      success: function(model, response) {
//          model.set({"name": "wasSaved"});
//          model.save();
//      },
//      error: function(model, response) {
//          alert("Error");
//      }
//  });
  //recipeModel.save();
  //var recipeMenu = new RecipeMenu({model: recipeModel});
  var view = new RecipeView({id: 3});

});
