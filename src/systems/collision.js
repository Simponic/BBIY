game.system.Collision = (entitiesGrid) => {
  const update = (elapsedTime, entities, changedIds) => {
    const thisChangedIds = new Set();
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
          entity.removeComponent("momentum");
        } else {
          entitiesToPush.map((e) => {
            const pushedParticleSpawner = game.createBorderParticles();
            pushedParticleSpawner.addComponent(game.components.Position(e.components.position));
            pushedParticleSpawner.addComponent(game.components.Appearance({width: game.canvas.width / game.config.xDim, height: game.canvas.height / game.config.yDim}));
            game.entities[pushedParticleSpawner.id] = pushedParticleSpawner;

            e.addComponent(game.components.Momentum({...momentum}));
          });
        }
      }
    }
    return thisChangedIds;
  };
  return { update };
};
