game.system.Render = (graphics) => {
  const update = (elapsedTime, entities, _changedIds) => {
    graphics.clear();

    const entitiesArray = Object.keys(entities).map(key => entities[key]);
    const sortedEntities = entitiesArray.sort((a, b) => {
      const aprior = a.hasComponent("loadPriority") ? a.components.loadPriority.priority : 0;
      const bprior = b.hasComponent("loadPriority") ? b.components.loadPriority.priority : 0;
      return bprior - aprior;
    });

    sortedEntities.forEach((entity) => {
      if (entity.sprite && entity.hasComponent("position") && entity.hasComponent("appearance")) {
        entity.sprite.draw(elapsedTime, {...entity.components.position, ...entity.components.appearance});
      }
    });

    return new Set();
  }
  return { update };
};