define(['ingredient', 'ingredients', "ingredientView", "recipeModel"],
    function(Ingredient, Ingredients, IngredientView, RecipeModel) {

var RecipeView = Backbone.View.extend({

  el: "#recipe",

  events: {
    // Global events... like recipe optimization... ultimately
    // this should probably be moved one level up, to the recipeView
    "click #add": "addIngredient",
    "click #save": "save"
  },
 
  // Initialize should be called with an object that has an ID field
  initialize: function(recipeData) {
     var self = this;
     this.ingredientViews = {};
     this.recipe = new RecipeModel(recipeData);
     // TODO: Can't get this to work...
     this.recipe.fetch({success: function() { self.render() }});
     this.render();
     this.$add = this.$("#add");
     this.$recipeName = this.$("#recipeName");
     // TODO: Apparently the best practice is to generate the model
     // on the server-side, but we won't do that for now.
     this.listenTo(this.recipe, 'add', this.renderIngredient);
  },

  render: function() {
    $("#recipeName").text(this.recipe.get("name"));
    // I should be using templates...
    $("#ingredients").empty();
    this.ingredientViews = {};
    $("#ingredients").append("<th>Ingredient</th><th>Quantity</th><th>Units</th><th></th>");
    this.recipe.get("ingredients").each(function(ingredient) {
      this.renderIngredient(ingredient);
    }, this);
  },

  renderIngredient: function(ingredient) {
    var view = new IngredientView({model: ingredient});
    view.parentView = this;
    // Add to the list of ingredients
    $("#ingredients").append(view.render().el);
    this.ingredientViews[ingredient] = view;
  }, 

  addIngredient: function(event) {
    ingredientName = $("#addInput").val();
    this.recipe.add(new Ingredient({}));
  },

  removeIngredient: function(ingredient) {
    this.recipe.remove(ingredient);
  },

  save: function() {
    this.update();
    this.recipe.save();
  },

  update: function() {
    for (var k in this.ingredientViews) {
      if (this.ingredientViews.hasOwnProperty(k)) {
        this.ingredientViews[k].update();
      }
    }
  }

});

return RecipeView;
});
