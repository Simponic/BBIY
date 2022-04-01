game.nextId = 0;

game.Entity = (id=game.nextId++) => {
  const components = {};

  const addComponent = (component) => {
    components[component.name] = component;
  }
  const removeComponent = (component) => {
    delete components[component.name];
  }
  const hasComponent = (component) => {
    components[component.name] !== undefined;
  }

  return {
    id,
    components,
    addComponent,
    removeComponent,
    hasComponent
  };
}