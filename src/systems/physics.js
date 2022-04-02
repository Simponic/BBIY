game.system.Physics = () => {
  const update = (elapsedTime) => {
    for (let id in game.entities) {
      const entity = game.entities[id];
      if (entity.hasComponent("momentum")) {
        const {dx, dy} = entity.components.momentum;
        entity.components.position.x += dx * elapsedTime;
        entity.components.position.y += dy * elapsedTime;
      }
    }
  }
  return { update };
}