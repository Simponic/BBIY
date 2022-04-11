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
//            const particles = game.createBorderParticles({
//              colors: ["#16f7c9", "#0d6e5a", "#2fa18a", "#48cfb4", "#58877d", "#178054", "#2cdb92"],
//              maxSpeed: 0.20,
//              minRadius: 1,
//              maxRadius: 3,
//              minLife: 100,
//              maxLife: 300,
//              minAmount: 20,
//              maxAmount: 50,
//            });
//            particles.addComponent(game.components.Position(e.components.position));
//            particles.addComponent(game.components.Appearance({width: game.canvas.width / game.config.xDim, height: game.canvas.height / game.config.yDim}));
//            game.entities[particles.id] = particles;
            e.addComponent(game.components.Momentum({...momentum}))
          });
        }
      }
    }
    return thisChangedIds;
  };
  return { update };
};
