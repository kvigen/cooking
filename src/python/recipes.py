from django.http import HttpResponse
import json

RECIPES_DIRECTORY = "recipes/"

def get_recipes(request):
  with open(RECIPES_DIRECTORY + "recipes.json", "r") as myfile:
    return HttpResponse(myfile.read())

def get_recipe_map():
  with open(RECIPES_DIRECTORY + "recipes.json", "r") as myfile:
    return json.loads(myfile.read())

def save_recipe_map(recipes_list):
  print("Writing recipe: " + json.dumps(recipes_list))
  with open(RECIPES_DIRECTORY + "recipes.json", "w+") as myfile:
    myfile.write(json.dumps(recipes_list, sort_keys=True, indent=4, separators=(',', ': ')))
