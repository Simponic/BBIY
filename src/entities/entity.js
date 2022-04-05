game.nextId = 0;

game.Entity = (id=game.nextId++) => {
  const components = {};

  const addComponent = (component) => {
    components[component.name] = component;
  };
  const hasComponent = (componentName) => components[componentName] !== undefined;
  const removeComponent = (componentName) => {
    if (hasComponent(componentName)) {
      delete components[componentName];
    }
  };
  
  return {
    id,
    components,
    addComponent,
    removeComponent,
    hasComponent
  };
}