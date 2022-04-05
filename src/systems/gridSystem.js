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
        const newGridCoords = gameCoordsToGrid(entity.components.position);
        const oldGridCoords = entity.components.gridPosition;
        if (!equivalence(newGridCoords, oldGridCoords)) {
          const momentumVector = unitize({ 
            dx: newGridCoords.x - oldGridCoords.x,
            dy: newGridCoords.y - oldGridCoords.y,
          });

          const proposed = {
            x: entity.components.gridPosition.x + momentumVector.dx,
            y: entity.components.gridPosition.y + momentumVector.dy
          };
					
          const proposedCopy = {...proposed};
          if (entity.hasComponent("controllable")) {
            let found = false;
            do {
              found = false;
              const entitiesInCell = entitiesGrid[proposedCopy.y][proposedCopy.x];
              entitiesInCell.forEach((entity) => {
                if (entity.hasComponent("pushable")) {
                  entity.addComponent(game.components.Momentum({...momentumVector}));
                  found = true;
                }
              });
              proposedCopy.x += momentumVector.dx;
              proposedCopy.y += momentumVector.dy;
              const proposedCopyInBounds = clamp(proposedCopy, xDim-1, yDim-1);
              if (!equivalence(proposedCopyInBounds, proposedCopy)) {
                found = false;
              }
            } while (found);
          }

          entity.components.gridPosition = {...entity.components.gridPosition, ...proposed};

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
