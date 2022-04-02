game.system.GridSystem = ({ xDim, yDim, canvasWidth, canvasHeight }) => {
  const entitiesGrid = Array(yDim).fill(null).map(() => Array(xDim).fill(null).map(() => new Map()));

  const gridWidth = canvasWidth / xDim;
  const gridHeight = canvasHeight / yDim;

  const gameCoordsToGrid = ({ x, y }) => {
    return { x: Math.floor((x+gridWidth/2) / canvasWidth * xDim), y: Math.floor((y+gridHeight/2) / canvasHeight * yDim) };
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
        entity.components.appearance.width = canvasWidth / xDim;
        entity.components.appearance.height = canvasHeight / yDim;
      }
      if (entity.hasComponent("position")) {
        const newGridCoords = gameCoordsToGrid(entity.components.position);
        const oldGridCoords = entity.components.gridPosition;
        if (!equivalence(newGridCoords, oldGridCoords)) {
          const momentumVector = unitize({ 
            dx: newGridCoords.x - oldGridCoords.x,
            dy: newGridCoords.y - oldGridCoords.y,
          });

          // TODO: Loop in momentum direction until we find an entity that does not have "push" component
          entity.components.gridPosition.x = entity.components.gridPosition.x + momentumVector.dx;
          entity.components.gridPosition.y = entity.components.gridPosition.y + momentumVector.dy;

          entity.components.position = {
            ...entity.components.position,
            ...gridCoordsToGame(entity.components.gridPosition)
          };

          if (entity.hasComponent("momentum")) {
            entity.components.momentum.dx = 0;
            entity.components.momentum.dy = 0;
          }
        }
      }
    });
  };

  return { entitiesGrid, gameCoordsToGrid, gridCoordsToGame, update, gridWidth, gridHeight };
};