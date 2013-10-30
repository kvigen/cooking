recipeMenu = undefined;
ingredientMetadata = undefined;

// Ultimately I want to return this from a function

var RecipeMenu = function() {

  var that = this; 
  that.recipe = undefined;
  that.editMode = false;
 
  this.toggleEditMode = function() {
    $('.dropdown-menu').dropdown();
    that.editMode = !that.editMode;
    that.renderTable();
  }

  this.action = function(action) {
    if (!that.recipe) {
      return;
    }
    // TODO: Should really build the recipe actions dynamically at some point
    if (action === "double") {
      that.recipe.doubleIngredients();
    }
    that.editMode = true;
    that.renderTable();
  }

  this.renderTable = function() {
    if (!that.recipe || !ingredientMetadata) {
      return;
    }
    var recipeBody = $("#recipeBody");
    recipeBody.empty();
    var row = $("<tr></tr>").appendTo(recipeBody);
    $("<th>Quantity</th>").appendTo(row);
    $("<th>Units</th>").appendTo(row);
    $("<th>Ingredients</th>").appendTo(row);

    _.each(that.recipe.ingredients, function(ingredient) {
      var row = $("<tr></tr>").appendTo("#recipeBody");
      that.addElem(ingredient.quantity, [], row);
      that.addElem(ingredient.units, ingredientMetadata.getUnitNames(), row);
      that.addElem(ingredient.name, ingredientMetadata.getIngredientNames(), row);
    });
    if (that.editMode) {
      $("#editButton").text("Save");
    } else {
      $("#editButton").text("Edit");
    }
  }

  this.addElem = function(defaultVal, typeaheadValues, row) {
    var elem = $("<th></th>").appendTo(row);
    if (that.editMode) { 
      var input = $("<input type=\"text\" value=\"" + defaultVal + "\"/>").autocomplete({ source: typeaheadValues, autoFill: true, selectFirst: true, width: '240px' });
      input.appendTo(elem);
    } else {
      elem.text(defaultVal);
    }
  }
}

var recipeMenu = new RecipeMenu();

// IngredientsMetadata object
var IngredientsMetadata = function(jsonInput) {

  this.jsonInput = jsonInput;

  this.getUnitNames = function() {
    return _.map(this.jsonInput.units, function(unit) { return unit.name; });
  }
  
  this.getIngredientNames = function() {
    return _.map(this.jsonInput.ingredients, function(ingredient) { 
      return ingredient.name;
    });
  }
} 

// Recipe object
var Recipe = function(recipe) {
  this.recipe = recipe;
  this.ingredients = recipe.ingredients; 
 
  this.doubleIngredients= function() {
    _.each(this.recipe.ingredients, function(ingredient) {
      ingredient.quantity *= 2;
    });
  } 
}

$(document).ready(function() {
  
  $.getJSON("../static_json/ingredient_metadata.json", function(inputIngredients) {
    ingredientMetadata = new IngredientsMetadata(inputIngredients);
    recipeMenu.renderTable();
  });

  // TODO: Choose the recipe dynamically
  $.getJSON("../static_json/recipe.json", function(inputRecipe) {
    $("#recipeName").text(inputRecipe.name);
    recipeMenu.recipe = new Recipe(inputRecipe);
    recipeMenu.renderTable();
  });

});
