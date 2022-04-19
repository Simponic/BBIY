game.components = {};

game.Component = (name, spec) => {
  return {
    name,
    ...spec
  };
};
