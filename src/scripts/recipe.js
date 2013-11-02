define(['utils'], function(utils) {

recipeMenu = undefined;
ingredientMetadata = undefined;

var RecipeMenu = function() {

  var that = this; 
  that.recipe = undefined;
  that.editMode = false;
 
  that.toggleEditMode = function() {
    updateRecipe();
    $('.dropdown-menu').dropdown();
    that.editMode = !that.editMode;
    renderTable();
  }

  that.action = function(action) {
    if (!that.recipe) {
      return;
    }
    updateRecipe();
    // TODO: Should really build the recipe actions dynamically at some point
    if (action === "double") {
      that.recipe.doubleIngredients();
    }
    that.editMode = true;
    renderTable();
  }

  that.addRow = function() {
    if (!that.recipe) {
      return;
    }
    updateRecipe();
    that.recipe.addEmptyIngredient();
    renderTable();
  }

  // This funciton updates the recipe object based on what the user has entered
  var updateRecipe = function() {
    var ingredients = []
    var rows = $("#recipeBody tr:gt(0)");
    _.each(rows, function(row) {
      ingredient = {};
      // It's annoying that we have do pretty much everything differently in the
      // edit / non-edit mode. Well, I guess they really are two different moves
      if (!that.editMode) {
        ingredient.quantity = $("th:nth-child(1)", row).text();
        ingredient.units = $("th:nth-child(2)", row).text();
        ingredient.name = $("th:nth-child(3)", row).text();
      } else {
        ingredient.quantity = $("th:nth-child(1) input", row).val();
        ingredient.units = $("th:nth-child(2) input", row).val();
        ingredient.name = $("th:nth-child(3) input", row).val();
      }
      ingredients.push(ingredient);
    });
    that.recipe.setIngredients(ingredients);
  }      

  var renderTable = function() {
    if (!that.recipe || !ingredientMetadata) {
      return;
    }
    $("#addRow").prop("disabled", !that.editMode);
    var recipeBody = $("#recipeBody");
    recipeBody.empty();
    var row = $("<tr>A</tr>").appendTo(recipeBody);
    $("<th>Quantity</th>").appendTo(row);
    $("<th>Units</th>").appendTo(row);
    $("<th>Ingredients</th>").appendTo(row);
    if (that.editMode) {
      $("<th></th>").appendTo(row);
    }

    var i = 0;
    _.each(that.recipe.getIngredients(), function(ingredient) {
      var row = $("<tr>A</tr>").appendTo("#recipeBody");
      addElem(ingredient.quantity, [], row);
      addElem(ingredient.units, ingredientMetadata.getUnitNames(), row);
      addElem(ingredient.name, ingredientMetadata.getIngredientNames(), row);
      addRemoveRowButton(row, i);
      i++;
    });
    if (that.editMode) {
      $("#editButton").text("Save");
    } else {
      $("#editButton").text("Edit");
    }
  }

  var addElem = function(defaultVal, typeaheadValues, row) {
    var elem = $("<th></th>").appendTo(row);
    if (that.editMode) { 
      var input = $("<input type=\"text\" value=\"" + defaultVal + "\"/>").autocomplete({ source: typeaheadValues, autoFill: true, selectFirst: true, width: '240px' });
      input.appendTo(elem);
    } else {
      elem.text(defaultVal);
    }
  }

  var addRemoveRowButton = function(row, index) {
    if (that.editMode) {
      var elem = $("<th><button type=\"button\" class=\"btn btn-primary\">X</button></th>");
      elem.click(function() {
        that.recipe.remove(index);
        elem.parent().remove();
        renderTable();
      });
      elem.appendTo(row);
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
      that.recipe = new Recipe(inputRecipe);
      renderTable();
    });
  });
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

// Recipe object
var Recipe = function(recipe) {
  this.recipe = recipe;

  this.getIngredients = function() {
    return this.recipe.ingredients;
  }

  this.setIngredients = function(ingredients) {
    this.recipe.ingredients = ingredients;
  }
 
  this.addEmptyIngredient = function() {
    this.recipe.ingredients.push({"quantity":"", "units":"", "name":""});
  }

  this.remove = function(index) {
    this.recipe.ingredients.remove(index);
  }

  this.doubleIngredients = function() {
    _.each(this.recipe.ingredients, function(ingredient) {
      ingredient.quantity *= 2;
    });
  } 
}

// Not sure if this should really go here???

return RecipeMenu;
});
