# This class implements the double recipe optimization
# TODO: We should probably create a pseudo abstract class for this...
class VolToWeight(object):

  def name(self):
    return "Change Volume to Weight"

  # The volume to weight is always applicable
  def is_applicable(self, recipe):
    return True

  def apply_to(self, recipe):
  #Says to do the following for all ingredients in the "ingredients" array
    for ingredient in recipe["ingredients"]:
      if ingredient["units"].lower() == "cups":
        ingredient["quantity"] = int(ingredient["quantity"]) * 236.588
        ingredient["units"] = "ml"
    return recipe