# This class implements the double recipe optimization
# TODO: We should probably create a pseudo abstract class for this...
class Double(object):

  def name(self):
    return "Double Recipe"

  # The double method is always applicable
  def is_applicable(self, recipe):
    return True

  def apply_to(self, recipe):
    for ingredient in recipe["ingredients"]:
      ingredient["quantity"] = int(ingredient["quantity"]) * 2
    return recipe
