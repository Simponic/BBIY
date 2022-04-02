game.system.Physics = () => {
  const update = (elapsedTime) => {
    for (let id in game.entities) {
      const entity = game.entities[id];
      if (entity.hasComponent("momentum") && entity.hasComponent("appearance")) {
        const {dx, dy} = entity.components.momentum;
        entity.components.position.x += dx * elapsedTime;
        entity.components.position.y += dy * elapsedTime;
        entity.components.position.x = Math.max(0, Math.min(game.canvas.width - entity.components.appearance.width, entity.components.position.x));
        entity.components.position.y = Math.max(0, Math.min(game.canvas.height - entity.components.appearance.height, entity.components.position.y));
      }
    }
  }
  return { update };
}