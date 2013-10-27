recipe = undefined;
ingredientMetadata = undefined;
editMode = false;
  
var toggleEditMode = function() {
  editMode = !editMode;
  if (editMode) {
    $("#editButton").text("Save");
  } else {
    $("#editButton").text("Edit");
  }
  renderTable();
}

var renderTable = function() {
  if (!recipe || !ingredientMetadata) {
    return;
  }
  var recipeBody = $("#recipeBody");
  recipeBody.empty();
  var row = $("<tr></tr>").appendTo(recipeBody);
  $("<th>Quantity</th>").appendTo(row);
  $("<th>Units</th>").appendTo(row);
  $("<th>Ingredients</th>").appendTo(row);

  _.each(recipe.ingredients, function(ingredient) {
    var row = $("<tr></tr>").appendTo("#recipeBody");
    addElem(ingredient.quantity, [], row);
    addElem(ingredient.units, ingredientMetadata.getUnitNames(), row);
    addElem(ingredient.name, ingredientMetadata.getIngredientNames(), row);
  });
}


var addElem = function(defaultVal, typeaheadValues, row) {
  var elem = $("<th></th>").appendTo(row);
  if (editMode) { 
    var input = $("<input type=\"text\" value=\"" + defaultVal + "\"/>").autocomplete({ source: typeaheadValues, autoFill: true, selectFirst: true, width: '240px' });
    input.appendTo(elem);
  } else {
    elem.text(defaultVal);
  }
}


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

$(document).ready(function() {
  
  $.getJSON("../static_json/ingredient_metadata.json", function(inputIngredients) {
    ingredientMetadata = new IngredientsMetadata(inputIngredients);
    renderTable();
  });

  // TODO: Choose the recipe dynamically
  $.getJSON("../static_json/recipe.json", function(inputRecipe) {
    $("#recipeName").text(inputRecipe.name);
    recipe = inputRecipe;
    renderTable();
  });

});
