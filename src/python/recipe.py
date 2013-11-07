from django.shortcuts import render_to_response
from django.http import HttpResponse
import os

# TODO: Put the data in a db... or use Amazon... at least add security
# to check that the user has permission
# TODO: Put error handling in...

# TODO: Make this configurable
recipe_directory = "recipes/"

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

# Save a recipe. Note that this will overwrite the recipe if it already exists
def _save_recipe(request, recipe_id):
  recipe_file = _get_recipe_filename(recipe_id)
  with open(recipe_file, "w+") as myfile:
    myfile.write(request.POST['recipe'])
  return HttpResponse("Success!")

def _get_recipe(request, recipe_id):
  recipe_file = _get_recipe_filename(recipe_id)
  with open(recipe_file, "r") as myfile:
    return HttpResponse(myfile.readline())

def _delete_recipe(request, recipe_id):
   filename = _get_recipe_filename(recipe_id)
   os.remove(filename)
   return HttpResponse("Success!")

def _get_recipe_filename(recipe_id):
  return recipe_directory + "recipe" + recipe_id
