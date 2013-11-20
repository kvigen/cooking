import double
import json
import unittest

class TestOptimizations(unittest.TestCase):

  def test_double(self):
    f = open("resources/recipe.json")
    recipe = f.read()
    recipe_json = json.loads(recipe)    

    optimization = double.Double()
    self.assertTrue(optimization.is_applicable(recipe_json))

    output_recipe = optimization.apply_to(recipe_json)
    self.assertEqual(2, len(output_recipe["ingredients"]))
    # Make sure the quantities are correct
    self.assertEqual(8, output_recipe["ingredients"][0]["quantity"])
    self.assertEqual(4, output_recipe["ingredients"][1]["quantity"])

if __name__ == "__main__":
   unittest.main()
