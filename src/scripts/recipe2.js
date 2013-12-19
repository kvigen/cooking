define(['utils', 'ingredient'], function(utils, ingredient) {

var RecipeMenu = Backbone.View.extend({

  el: "#recipeMenu",

  initialize: function() {
    this.editMode = false;
    this.model.bind('change', _.bind(this.render, this));
  },
  events: {
    "click #test": "toggleEditMode",
    "change input" : "changed"
  },

  // A generic way to handle changes to an object... can put for other
  // things as well
  changed: function(evt) {
    var changed = evt.currentTarget;
    var value = $(evt.currentTarget).val();
    var obj = {};
    obj[changed.id] = value;
    this.model.set(obj);
  },
 
  toggleEditMode: function() {
    this.editMode = !this.editMode;
    this.render();
  },

  // Apparently this should use mustasche somehow and we should have a
  // template field...
  render: function() {
    $("#editMode").text(this.editMode);
    $("#recipeName").text(this.model.get("name"));
    var ingredientNames = this.model.get("ingredients").pluck("name");
    console.log(ingredientNames);
    return this;
  },

});

return RecipeMenu;

});
