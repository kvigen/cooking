require.config({
  baseUrl: '../scripts',
  // This isn't ideal. At some point I'll serve the static files with Apache,
  // or something similar
  //urlArgs: "bust=" + (new Date()).getTime()

});

var recipeMenu = undefined;
define(['recipe'], function(Menu) { 
  recipeMenu = new Menu();

});
