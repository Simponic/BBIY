const unitize = (vector) => {
  // Not *technically* a unit vector, but has x,y components of |magnitude| = 1
  Object.keys(vector).forEach((key) => {
    if (typeof vector[key] === 'object') {
      vector[key] = vector[key].unitize();
    } else if (typeof vector[key] === 'number') {
      vector[key] = (vector[key] === 0 ? 0 : vector[key] / Math.abs(vector[key]));
    }
  });
  return vector;
}