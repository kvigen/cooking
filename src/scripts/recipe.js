define(['utils'], function(utils) {

recipeMenu = undefined;
ingredientMetadata = undefined;

var RecipeMenu = function() {

  var that = this; 
  that.recipe = undefined;
  that.optimizations = undefined;
  that.editMode = false;
  that.recipeTypes = undefined;
 
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
    $.post("../recipes/optimization",
          { optimization: action, recipe: JSON.stringify(that.recipe) },
          function(recipe) {
              that.recipe = new Recipe(recipe)
              renderTable();
          },
          "json");
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

  that.triggerRefresh = function() {
    if (!that.recipe) {
      return;
    }
    updateRecipe();
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
    that.recipe.ingredients = ingredients;
    that.recipe.type = $("#recipeType").val();
    that.recipe.subclass = $("#recipeSubclass").val();
    that.recipe.panSize = $("#panSize").val();
    that.recipe.bakingTime = $("#bakingTime").val();
    that.recipe.bakingTemperature = $("#bakingTemperature").val();
  }      

  var renderTable = function() {
    if (!that.recipe || !ingredientMetadata) {
      return;
    }
 
    // Flip the edit mode flag 
    $(".canDisable").prop("disabled", !that.editMode);
    
    if (that.recipeTypes) {
      if ($("#recipeType").children("option").length === 0) {
        _.each(that.recipeTypes, function(recipeType) {
           $("<option>" + recipeType.name + "</option>").appendTo("#recipeType");
        });
      }
      $("#recipeSubclass").empty();
      var subclasses = $.grep(that.recipeTypes, function(e) { 
          return e.name === that.recipe.type;
      });
      _.each(subclasses[0].subtypes, function(subtype) { 
         $("<option>" + subtype + "</option>").appendTo("#recipeSubclass");
      });
    }

    // Set all the recipe metadata from the recipe
    $("#recipeType").val(that.recipe.type);
    $("#recipeSubclass").val(that.recipe.subclass);
    $("#panSize").val(that.recipe.panSize);
    $("#bakingTime").val(that.recipe.bakingTime);
    $("#bakingTemperature").val(that.recipe.bakingTemperature);

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
    _.each(that.recipe.ingredients, function(ingredient) {
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
    $("#optimizations").empty();
    // Probably should only make this applicable in edit mode... not really sure
    _.each(that.optimizations, function(optimization) {
      list_item = $("<li></li");
      list_item.attr("role", "presentation");
      link = $("<a></a>");
      link.attr("role", "menuItem");
      link.attr("onclick", "recipeMenu.action('" + optimization + "');");
      link.text(optimization)
      list_item.append(link);
      $("#optimizations").append(list_item)
    });
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
      // TODO: Should this be moved to the renderTable function???
      $("#recipeName").text(inputRecipe.name);
      that.recipe = new Recipe(inputRecipe);
      // TODO: We need to be smarter about re-calling this periodically to
      // make sure the optimizations still apply
      $.post("../recipes/optimizations",
          { recipe: JSON.stringify(that.recipe) },
          function(optimizations) {
              that.optimizations = optimizations;
              renderTable(); 
          },
          "json");
    });

    $.getJSON("../static_json/recipe_types.json", function(recipeTypes) {
      that.recipeTypes = recipeTypes;
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
      return ingredient.Description;
    });
  }

} 

// Recipe object
var Recipe = function(recipe) {
  this.ingredients = recipe.ingredients;
  // TODO: Maybe I should grab these out dynamically??? Is that easy???
  this.type = recipe.type;
  this.subclass = recipe.subclass;
  this.panSize = recipe.panSize;
  this.bakingTime = recipe.bakingTime;
  this.bakingTemperature = recipe.bakingTemperature;

  this.addEmptyIngredient = function() {
    this.ingredients.push({"quantity":"", "units":"", "name":""});
  }

  this.remove = function(index) {
    this.ingredients.remove(index);
  }
}

// Not sure if this should really go here???

return RecipeMenu;
});
