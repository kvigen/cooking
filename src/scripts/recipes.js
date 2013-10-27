$(document).ready(function() {

  $.getJSON("../static_json/all_recipes.json", function(all_recipes) {
    _.each(all_recipes.recipes, function(recipe) {
      // Ultimately this should probably have a click-option that changes
      // elements on other parts of the page...
      $("#recipeList").append("<div><a href=\"recipe?id=" + recipe.id + "\"a>" + 
          recipe.name + "</a></div>")
    });
 });
});
