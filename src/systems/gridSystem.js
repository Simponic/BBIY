game.system.GridSystem = ({ xDim, yDim }) => {
  const entitiesGrid = Array(yDim).fill(null).map(() => Array(xDim).fill(null).map(() => new Map()));

  let gridWidth = game.canvas.width / xDim;
  let gridHeight = game.canvas.height / yDim;

  const gameCoordsToGrid = ({ x, y }) => {
    return { x: Math.floor((x+gridWidth/2) / game.canvas.width * xDim), y: Math.floor((y+gridHeight/2) / game.canvas.height * yDim) };
  };

  const gridCoordsToGame = ({ x, y }) => {
    return { x: x * gridWidth, y: y * gridHeight };
  };

  const rebuildGrid = (entities) => {
    let changedIds = new Set();
    entities.map(entity => {
      const { x, y } = entity.components.gridPosition;
      if (!entitiesGrid[y][x].has(entity.id)) {
        changedIds.add(entity.id);
      }
    });
    entitiesGrid.forEach((row) => row.forEach((entitiesInCell) => {
      for (let id of entitiesInCell.keys()) {
        if (changedIds.has(id)) {
          entitiesInCell.delete(id);
        }
      }
    }));
    changedIds.forEach(id => {
      const entity = entities[id];
      const { x, y } = entity.components.gridPosition;
      entitiesGrid[y][x].set(entity.id, entity);
    });
  }

  const update = (_elapsedTime, entities) => {
    const gridEntities = Object.keys(entities).filter((x) => entities[x].hasComponent("gridPosition")).map((x) => entities[x]);
    rebuildGrid(gridEntities);
    gridEntities.map((entity) => {
      if (entity.hasComponent("appearance")) {
        entity.components.appearance.width = gridWidth;
        entity.components.appearance.height = gridHeight;
      }
      if (entity.hasComponent("position")) {
        let newGridCoords = gameCoordsToGrid(entity.components.position);
        const oldGridCoords = entity.components.gridPosition;
        if (!equivalence(newGridCoords, oldGridCoords)) {
          const momentumVector = unitize({ 
            dx: newGridCoords.x - oldGridCoords.x,
            dy: newGridCoords.y - oldGridCoords.y,
          });

          const proposed = {...newGridCoords};
          let wall = false;
          let entitiesToPush = [];
          if (entity.hasComponent("controllable")) {
            let found = false;
            do {
              found = false;
              const entitiesInCell = entitiesGrid[proposed.y][proposed.x];
              for (let entity of entitiesInCell.values()) {
                if (entity.hasComponent("pushable")) {
                  found = true;
                  entitiesToPush.push(entity);
                }
                if (entity.hasComponent("stop")) {
                  wall = true;
                  found = false;
                  break;
                }
              }
              proposed.x += momentumVector.dx;
              proposed.y += momentumVector.dy;
              const proposedClampedInBounds = clamp(proposed, xDim-1, yDim-1);
              if (!equivalence(proposedClampedInBounds, proposed)) {
                found = false;
              }
            } while (found);
          }

          if (entity.hasComponent("controllable")) {
            if (!wall) {
              entity.components.gridPosition = {...entity.components.gridPosition, ...newGridCoords};
              entitiesToPush.map((e) => e.addComponent(game.components.Momentum({...momentumVector})));
            }
            const particles = game.createBorderParticles({
              colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"],
              maxAmount: 100,
              minAmount: 25,
              minLife: 100,
              maxLife: 300,
              minRadius: 1,
              maxRadius: 3,
              maxSpeed: 0.15,
            });
            particles.addComponent(game.components.Position(gridCoordsToGame(oldGridCoords)));
            particles.addComponent(game.components.Appearance({width: 50, height: 50}));
            game.entities[particles.id] = particles;
          } else {
            entity.components.gridPosition = {...entity.components.gridPosition, ...newGridCoords};
          }


          entity.components.position = {
            ...entity.components.position,
            ...gridCoordsToGame(entity.components.gridPosition)
          };

          if (entity.hasComponent("momentum")) {
            entity.components.momentum.dx = 0;
            entity.components.momentum.dy = 0;
          }
        }
      } else {
        entity.addComponent(game.components.Position({...gridCoordsToGame(entity.components.gridPosition)}));    
      };
    });
  };

  return { entitiesGrid, gameCoordsToGrid, gridCoordsToGame, update, gridWidth, gridHeight };
};
