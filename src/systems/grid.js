game.system.Grid = (entitiesGrid) => {
  let gridWidth = game.canvas.width / game.config.xDim;
  let gridHeight = game.canvas.height / game.config.yDim;

  const gameCoordsToGrid = ({ x, y }) => {
    return { x: Math.floor((x+gridWidth/2) / game.canvas.width * game.config.yDim), y: Math.floor((y+gridHeight/2) / game.canvas.height * game.config.yDim) };
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

  const update = (_elapsedTime, entities, changedIds) => {
    gridEntities = Object.keys(entities).filter((x) => entities[x].hasComponent("gridPosition")).map((x) => entities[x]);
    const thisChangedIds = new Set();
    gridEntities.map((entity) => {
      if (entity.hasComponent("appearance")) {
        entity.components.appearance.width = gridWidth;
        entity.components.appearance.height = gridHeight;
      }
      if (entity.hasComponent("gridPosition")) {
        const oldGridCoords = entity.components.gridPosition;
        if (entity.hasComponent("position")) {
          const gameCoords = gridCoordsToGame(entity.components.gridPosition);
          if (Math.abs(entity.components.position.x - gameCoords.x) >= gridWidth/2 || Math.abs(entity.components.position.y - gameCoords.y) >= gridHeight/2) {
            entity.components.gridPosition = gameCoordsToGrid(entity.components.position);
            if (entity.hasComponent("momentum")) {
              entity.removeComponent("momentum");
            }
          }
        }
        if (!entity.hasComponent("position") || !equivalence(entity.components.gridPosition, oldGridCoords)) {
          entity.components.position = {
            ...entity.components.position,
            ...gridCoordsToGame(entity.components.gridPosition)
          };
          thisChangedIds.add(entity.id);
        }
      }
    });
    rebuildGrid(gridEntities);
    return thisChangedIds;
  };


  return { gameCoordsToGrid, gridCoordsToGame, update, gridWidth, gridHeight };
};