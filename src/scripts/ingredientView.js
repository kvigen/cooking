define([], function() {

IngredientView = Backbone.View.extend({

  tagName: "tr",

  events: {
    // Not quite sure what events to support yet...
    //'keypress .edit': 'updateOnEnter',
    "click button": "remove"
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    var html = this.getElementHtml(this.model.get("name"));
    html += this.getElementHtml(this.model.get("quantity"));
    html += this.getElementHtml(this.model.get("units"));
    html += "<th><button>X</button></th>";
    this.$el.html(html);
    return this;
  },

  remove: function() {
    this.parentView.removeIngredient(this.model);
  },

  getElementHtml: function(value) {
    return "<th><input type=\"text\" value=\"" + value + "\"/></th>";
  },

  edit: function() {
    this.$el.addClass("editing");
  }

});

return IngredientView;
}); 
