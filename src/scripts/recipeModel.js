define(['ingredient', 'ingredients'],
    function(Ingredient, Ingredients) {

var RecipeModel = Backbone.Model.extend({

  defaults: {
    name: "",
    ingredients: new Ingredients()
  },

  parse: function(response) {
    response.ingredients = new Ingredients(response.ingredients);
    return response;
  },

  add: function(ingredient) {
    this.get("ingredients").add(ingredient);
    // This is a bit clunky, maybe we should have an intermediate view
    this.trigger('add', ingredient);
  },

  urlRoot: "/recipes/recipe"
});

return RecipeModel;

});

