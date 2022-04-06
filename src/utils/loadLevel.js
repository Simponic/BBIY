game.loadLevel = (level) => {
  const entities = {};
  const config = {...level.gridSize};
  for (let y = 0; y < level.gridSize.yDim; y++) {
    for (let x = 0; x < level.gridSize.xDim; x++) {
      const cell = level.level[y][x];
      cell.forEach((letter) => {
        let entity;
        switch (letter) {
          case 'b':
            entity = game.createBigBlue();
            break;
          case 'h':
            entity = game.createHedge();
            break;
          case 'r':
            entity = game.createRock();
            break;
          case 'f':
            entity = game.createFlag();
            break;
          case 'g':
            entity = game.createGrass();
            break;
          case 'l':
            entity = game.createFloor();
            break;
          case 'w':
            entity = game.createWall();
            break;
          case 'a':
            entity = game.createWater();
            break;
          case 'A':
            entity = game.createWordWater();
            break;
          case 'N':
            entity = game.createWordSink();
            break;
          case 'V':
            entity = game.createWordLava();
            break;
          case 'v':
            entity = game.createLava();
            break;
          case 'K':
            entity = game.createWordKill();
            break;
          case 'W':
            entity = game.createWordWall();
            break;
          case 'I':
            entity = game.createWordIs();
            break;
          case 'S':
            entity = game.createWordStop();
            break;
          case 'R':
            entity = game.createWordRock();
            break;
          case 'P':
            entity = game.createWordPush();
            break;
          case 'B':
            entity = game.createWordBigBlue();
            break;
          case 'Y':
            entity = game.createWordYou();
            break;
          case 'F':
            entity = game.createWordFlag();
            break;
          case 'X':
            entity = game.createWordWin();
            break;
          default:
            break;
        }
        if (entity) {
          entity.addComponent(game.components.GridPosition({x, y}));
          entities[entity.id] = entity;
        }
      });
    }
  }
  return [entities, config];
};