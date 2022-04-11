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
  [game.entities, game.config] = game.loadLevel(game.levels[4]);

  // Maintained by gridSystem as a side-effect
  game.entitiesGrid = Array(game.config.yDim).fill(null).map(() => Array(game.config.xDim).fill(null).map(() => new Map()));

  game.systemOrder = ["gridSystem", "collisionSystem", "physics", "keyboardInput", "undo", "particle", "render"];
  game.systems = { };
  game.systems.physics = game.system.Physics(),
  game.systems.gridSystem = game.system.Grid(game.entitiesGrid);
  game.systems.collisionSystem = game.system.Collision(game.entitiesGrid);
  game.systems.render = game.system.Render(game.graphics);
  game.systems.undo = game.system.Undo(game.entitiesGrid);
  game.systems.keyboardInput = game.system.KeyboardInput(game.systems.undo);
  game.systems.particle = game.system.Particle(game.canvas.context);

  lastTimeStamp = performance.now()
  requestAnimationFrame(game.loop);
}
