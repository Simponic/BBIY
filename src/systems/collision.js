game.system.Collision = (entitiesGrid) => {
  const update = (elapsedTime, entities, changedIds) => {
    for (let entity of Object.keys(entities).map((id) => entities[id])) {
      if (entity.hasComponent("controllable") && entity.hasComponent("gridPosition") && entity.hasComponent("momentum")) {
        const momentum = unitize(entity.components.momentum);

        let found;
        const proposed = {x: entity.components.gridPosition.x + momentum.dx, y: entity.components.gridPosition.y + momentum.dy};
        const entitiesToPush = [];
        let wall = false;
        do {
          const proposedClampedInBounds = clamp(proposed, game.config.xDim-1, game.config.yDim-1);
          if (!equivalence(proposed, proposedClampedInBounds)) {
            break;
          }

          found = false;

          const entitiesInCell = entitiesGrid[proposed.y][proposed.x];

          for (let next of entitiesInCell.values()) {
            if (next.hasComponent("stop")) {
              console.log("WALL FOUND")
              wall = next;
              found = false;
              break;
            }
            if (next.hasComponent("pushable")) {
              entitiesToPush.push(next);
              found = true;
            }
          }

          proposed.x += momentum.dx;
          proposed.y += momentum.dy;
        } while(found);

        if (wall) {
          console.log("WALL")
          entity.removeComponent("momentum");
        } else {
          entitiesToPush.map((e) => e.addComponent(game.components.Momentum({...momentum})));
        }
      }
    }
    return new Set();
  };
  return { update };
};
