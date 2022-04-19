const clamp = (vector, maxX, maxY) => {
  const newVector = {...vector};
  newVector.x = Math.max(0, Math.min(maxX, vector.x));
  newVector.y = Math.max(0, Math.min(maxY, vector.y));
  return newVector;
};
