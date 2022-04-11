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
      if (entity.hasComponent("position") && entity.hasComponent("appearance") && entity.hasComponent("sprite")) {
        game.sprites[entity.components.sprite.spriteName].draw(elapsedTime, {...entity.components.position, ...entity.components.appearance});
      }
    });

    return new Set();
  }
  return { update };
};