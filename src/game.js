game.loop = (timeStamp) => {
  if (!game.running) {
    return;
  }  

  let elapsedTime = timeStamp - game.lastTimeStamp;
  game.lastTimeStamp = timeStamp;

  const changedIds = new Set();
  game.systemOrder.map((i) => {
    game.systems[i]
      .update(elapsedTime, game.entities, changedIds)
      .forEach((id) => changedIds.add(id));
  });

  for (let id in game.entities) {
    if (game.entities[id].hasComponent("particles") && !game.entities[id].hasComponent("alive")) {
      delete game.entities[id];
    }
  }

  requestAnimationFrame(game.loop);
};

game.toggleRunning = () => {
  game.running = !game.running;
};

game.startLoop = () => {
  game.running = true;
  game.lastTimeStamp = performance.now();
  game.assets.music.play();
  if (game.assets.music.paused) {
    alert("Failed to start background music; please allow autoplay in your browser settings and refresh.");
  }
  requestAnimationFrame(game.loop);
};

game.loadSystems = () => {
  game.systemOrder = ["grid", "collision", "physics", "keyboardInput", "particle", "logic", "undo", "render"];
  game.systems = { };
  game.systems.physics = game.system.Physics(),
  game.systems.grid = game.system.Grid(game.entitiesGrid);
  game.systems.collision = game.system.Collision(game.entitiesGrid);
  game.systems.render = game.system.Render(game.graphics);
  game.systems.particle = game.system.Particle(game.canvas.context);
  game.systems.keyboardInput = game.system.KeyboardInput();
  game.systems.logic = game.system.Logic(game.entitiesGrid);
  game.systems.undo = game.system.Undo(game.entitiesGrid, game.systems.logic, game.systems.grid);  
  game.systems.menu = game.system.Menu();
};

game.loadLevelIndex = (level) => {
  game.win = false;  

  game.level = level;
  [game.entities, game.config] = game.loadLevel(game.levels[game.level]);

  // Maintained by grid system as a side-effect
  game.entitiesGrid = Array(game.config.yDim).fill(null).map(() => Array(game.config.xDim).fill(null).map(() => new Map()));
  game.loadSystems();
};

game.initialize = () => {
  game.assets.music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);

  game.loadLevelIndex(0);
  game.startLoop();
};
