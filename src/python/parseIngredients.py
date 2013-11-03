import json

with open("../resources/ingredients.csv") as f:
  i = 0
  ingredients = []
  typeArray = []
  for line in f.readlines():
    if i == 0:
      for typeVal in line.split("|"):
        typeArray.append(typeVal)
    else:
      j = 0
      for ingredient in line.split("|"):
        if not ingredient.strip() is "":
          metadata = {}
          metadata['name'] = ingredient
          if j >= len(typeArray):
            metadata['type'] = "None"
          else:
            metadata['type'] = typeArray[j]
          ingredients.append(metadata)
        j = j + 1
    i = i + 1

full_metadata = {}
full_metadata['ingredients'] = ingredients
units = []
units.append({"name" : "Cups"});
units.append({"name" : "Grams"});
full_metadata['units'] = units

print json.dumps(full_metadata, sort_keys=True, indent=4, separators=(',', ': '))
