game.system.Physics = () => {
  const update = (elapsedTime, entities, changedIds) => {
    for (let id in entities) {
      const entity = entities[id];
      if (entity.hasComponent("momentum") && entity.hasComponent("appearance")) {
        const {dx, dy} = entity.components.momentum;
        entity.components.position.x += dx * elapsedTime;
        entity.components.position.y += dy * elapsedTime;
        entity.components.position = clamp(entity.components.position, game.canvas.width - entity.components.appearance.width, game.canvas.height - entity.components.appearance.height);
      }
    }

    return new Set();
  }
  return { update };
}