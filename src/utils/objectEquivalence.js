const equivalence = (obj1, obj2) => {
  if (obj1 === null) {
    return obj1 === null;
  }
  return Object.keys(obj1).every(key => {
    if (obj2[key] === undefined) {
      return false;
    }
    if (typeof obj1[key] === 'object') {
      return equivalence(obj1[key], obj2[key]);
    }
    return obj1[key] === obj2[key];
  });
};
