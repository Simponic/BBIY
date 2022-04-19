game.system.Collision = (entitiesGrid) => {
  const update = (elapsedTime, entities, changedIds) => {
    const thisChangedIds = new Set();
    for (let entity of Object.keys(entities).map((id) => entities[id])) {
      if (entity.hasComponent("position") && entity.hasComponent("gridPosition") && (entity.hasComponent("burnable") || entity.hasComponent("sinkable")) && entity.hasComponent("alive")) {
        for (let collided of entitiesGrid[entity.components.gridPosition.y][entity.components.gridPosition.x].values()) {
          if (!equivalence(entity, collided) && collided.hasComponent("alive")){
            if (entity.hasComponent("burnable") && collided.hasComponent("burn")) {
              const burnedParticleSpawner = game.createBorderParticles({colors: ["#f58d42", "#d6600b", "#c7a312", "#f2b844"]});
              burnedParticleSpawner.addComponent(game.components.Position(collided.components.position));
              burnedParticleSpawner.addComponent(game.components.Appearance({width: game.canvas.width / game.config.xDim, height: game.canvas.height / game.config.yDim}));
              game.entities[burnedParticleSpawner.id] = burnedParticleSpawner;
              entity.removeComponent("alive");
              game.assets.death.play();
              break;
            } else if (entity.hasComponent("sinkable") && collided.hasComponent("sink")) {
              const sunkParticleSpawner = game.createBorderParticles({colors: ["#16f7c9", "#0d6e5a", "#2fa18a", "#48cfb4", "#58877d", "#178054", "#2cdb92"]});
              sunkParticleSpawner.addComponent(game.components.Position(collided.components.position));
              sunkParticleSpawner.addComponent(game.components.Appearance({width: game.canvas.width / game.config.xDim, height: game.canvas.height / game.config.yDim}));
              game.entities[sunkParticleSpawner.id] = sunkParticleSpawner;
              entity.removeComponent("alive");
              collided.removeComponent("alive");
              game.assets.death.play();
              break;
            }
          }
        }
      }
      if (entity.hasComponent("controllable") && entity.hasComponent("gridPosition")) {
        for (let collided of entitiesGrid[entity.components.gridPosition.y][entity.components.gridPosition.x].values()) {
          if (collided.hasComponent("win")) {
            game.assets.win.play();
            game.win = true;
            game.systems.menu.bringUpMenu();
            game.systems.menu.setState("levelSelect");
          }
        }

        if (entity.hasComponent("momentum")) {
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
              if (next.hasComponent("alive")) {
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
            }

            proposed.x += momentum.dx;
            proposed.y += momentum.dy;
          } while(found);

          if (wall) {
            entity.removeComponent("momentum");
          } else {
            game.assets.move.play();
            entitiesToPush.map((e) => {
              const pushedParticleSpawner = game.createBorderParticles({maxSpeed: 0.1, minAmount: 10, maxAmount: 15});
              pushedParticleSpawner.addComponent(game.components.Position(e.components.position));
              pushedParticleSpawner.addComponent(game.components.Appearance({width: game.canvas.width / game.config.xDim, height: game.canvas.height / game.config.yDim}));
              game.entities[pushedParticleSpawner.id] = pushedParticleSpawner;

              e.addComponent(game.components.Momentum({...momentum}));
            });
          }
        }
      }
    }
    return thisChangedIds;
  };
  return { update };
};
