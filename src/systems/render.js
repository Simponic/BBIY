game.system.Render = (graphics) => {
  const update = (elapsedTime, entities) => {
    graphics.clear();

    for (let id in entities) {
      const entity = entities[id];
      if (entity.sprite && entity.hasComponent("position") && entity.hasComponent("appearance")) {
        entity.sprite.draw(elapsedTime, {...entity.components.position, ...entity.components.appearance});
      }
    }
  }
  return { update };
};