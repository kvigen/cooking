import json

with open("../resources/ingredients.csv") as f:
  firstLine = True
  ingredients = []
  fieldArray = []
  for line in f.readlines():
    # Remove all the end-lines to start with
    line = line.replace("\n", "")
    if firstLine:
      for field in line.split("|"):
        fieldArray.append(field)
      firstLine = False
    else:
      j = 0
      metadata = {}
      for ingredient in line.split("|"):
        ingredient = ingredient.replace("\n", "")
        if ingredient.strip() is "":
          metadata[fieldArray[j]] = 0
        elif ingredient.strip() == "--":
          metadata[fieldArray[j]] = 0
        else:
          # Try to treat the string as a number. If that doesn't work then
          # just leave it as a string. At some point we can be a little
          # tougher about enforcing reasonable fields
          try:
            metadata[fieldArray[j]] = float(ingredient)
          except ValueError:
            metadata[fieldArray[j]] = ingredient
        j = j + 1
      ingredients.append(metadata)

full_metadata = {}
full_metadata['ingredients'] = ingredients
units = []
units.append({"name" : "Cups"});
units.append({"name" : "Grams"});
full_metadata['units'] = units

print json.dumps(full_metadata, sort_keys=True, indent=4, separators=(',', ': '))
