define([], function() {

IngredientView = Backbone.View.extend({

  tagName: "tr",

  events: {
    // Not quite sure what events to support yet...
    //'keypress .edit': 'updateOnEnter',
    "click button": "removeIngredient"
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.removeIngredient)
  },

  render: function() {
    var html = this.getElementHtml(this.model.get("name"));
    html += this.getElementHtml(this.model.get("quantity"));
    html += this.getElementHtml(this.model.get("units"));
    html += "<th><button>X</button></th>";
    this.$el.html(html);
    return this;
  },

  getElementHtml: function(value) {
    return "<th><input type=\"text\" value=\"" + value + "\"/></th>";
  },

  removeIngredient: function() {
    this.parentView.removeIngredient(this.model);
    // We don't want the parent to do this?? There isn't clear ownership here
    this.remove();
  },

  edit: function() {
    this.$el.addClass("editing");
  },

  // set the model values from the view
  update: function() {
    this.model.set("name", this.$("th:nth-child(1) input").val());
    this.model.set("quantity", parseFloat(this.$("th:nth-child(2) input").val()));
    this.model.set("units", this.$("th:nth-child(3) input").val());
  },


});

return IngredientView;
}); 
