let lastTimeStamp;
game.loop = (timeStamp) => {
  let elapsedTime = timeStamp - lastTimeStamp;
  lastTimeStamp = timeStamp;


  const changedIds = new Set();
  game.systemOrder.map((i) => {
    game.systems[i]
      .update(elapsedTime, game.entities, changedIds)
      .forEach((id) => changedIds.add(id));
  });

  for (let id in game.entities) {
    if (!game.entities[id].hasComponent("alive")) {
      delete game.entities[id];
    }
  }

  requestAnimationFrame(game.loop);
}

game.initialize = () => {
  [game.entities, game.config] = game.loadLevel(game.levels[0]);

  // Maintained by gridSystem as a side-effect
  game.entitiesGrid = Array(game.config.yDim).fill(null).map(() => Array(game.config.xDim).fill(null).map(() => new Map()));

  game.systemOrder = ["gridSystem", "collisionSystem", "physics", "keyboardInput", "render"];
  game.systems = {
    physics: game.system.Physics(game.entitiesGrid),
    gridSystem: game.system.Grid(game.entitiesGrid),
    collisionSystem: game.system.Collision(game.entitiesGrid),
    keyboardInput: game.system.KeyboardInput(),
    render: game.system.Render(game.graphics),
  };

  lastTimeStamp = performance.now()
  requestAnimationFrame(game.loop);
}
