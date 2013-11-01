require.config({
  baseUrl: '../scripts'
});

var recipeMenu = undefined;
define(['recipe'], function(Menu) { 
  recipeMenu = new Menu();
});
