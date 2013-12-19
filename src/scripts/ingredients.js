define(['utils', 'ingredient'], function(Utils, Ingredient) {

// Simple ingredients collection
var Ingredients = Backbone.Collection.extend({
  model: Ingredient

});

// Not sure how I want to handle change events. Can look for elements
// being added or changed.

return Ingredients;

});


