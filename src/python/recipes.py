from django.http import HttpResponse
import json
import recipe_optimizations

RECIPES_DIRECTORY = "recipes/"
optimizations = recipe_optimizations.Optimizations()

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

def get_optimizations(request):
  recipe = json.loads(request.POST['recipe'])
  optimization_names = optimizations.get_optimizations(recipe)
  return HttpResponse(json.dumps(optimization_names))

def apply_optimization(request):
  recipe = json.loads(request.POST['recipe'])
  optimization = request.POST['optimization']
  new_recipe = optimizations.apply_optimization(recipe, optimization)
  return HttpResponse(json.dumps(new_recipe))
