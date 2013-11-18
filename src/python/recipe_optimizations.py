import double as d

# Construct a optimizations class to hold all the optimizations
class Optimizations(object):
  def __init__(self):
    self.optimizations = {}
    double = d.Double()
    self.optimizations[double.name()] = double

  def get_optimizations(self, recipe):
    ret = []
    for optimization in self.optimizations.itervalues():
      if optimization.is_applicable(recipe):
	ret.append(optimization.name()) 
    return ret

  def apply_optimization(self, recipe, optimization_name):
    optimization = self.optimizations[optimization_name]
    # Probably should handle this error case better...
    if optimization is None:
      return []
    return optimization.apply_to(recipe)
