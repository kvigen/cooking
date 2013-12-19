define(['utils'], function(utils) {

// A very basic ingredient model
var Ingredient = Backbone.Model.extend({

  defaults: {
    name: "",
    quantity: 0,
    units: ""
  }

});

var ingredient = new Ingredient({
});

return Ingredient;

});
