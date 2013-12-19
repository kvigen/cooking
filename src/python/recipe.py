from django.shortcuts import render_to_response
from django.http import HttpResponse
import json
import os
import recipes

# TODO: Put the data in a db... or use Amazon... at least add security
# to check that the user has permission
# TODO: Put error handling in...

# TODO: Make this configurable

# See the tutorial pages for more details
# https://docs.djangoproject.com/en/1.5/intro/tutorial04/
# For example, how to get POST data (request.POST['choice'])

# This method handles getting, creating, updating and deleting recipes
def recipe_crud(request, recipe_id):
  if request.method == "GET":
    return _get_recipe(request, recipe_id)
  elif request.method == "DELETE":
    return _delete_recipe(request, recipe_id)
  else:
    return _save_recipe(request, recipe_id)

# Save a recipe. Note that this will overwrite the pre-existing recipe
def _save_recipe(request, recipe_id):
  recipe_map = recipes.get_recipe_map()
  recipe = json.loads(request.body)
  recipe_map[recipe_id] = {"id": recipe["id"], "name": recipe["name"]};
  recipes.save_recipe_map(recipe_map)

  recipe_file = _get_recipe_filename(recipe_id)
  with open(recipe_file, "w+") as myfile:
    myfile.write(request.body)
  return HttpResponse("Success!")

def _get_recipe(request, recipe_id):
  recipe_file = _get_recipe_filename(recipe_id)
  with open(recipe_file, "r") as myfile:
    return HttpResponse(myfile.read())

def _delete_recipe(request, recipe_id):
   recipe_map = recipes.get_recipe_map()
   del recipe_map[recipe_id]
   recipes.save_recipe_map(recipe_map)
   filename = _get_recipe_filename(recipe_id)
   os.remove(filename)
   return HttpResponse("Success!")

def _get_recipe_filename(recipe_id):
  return recipes.RECIPES_DIRECTORY + "recipe" + recipe_id + ".json"
