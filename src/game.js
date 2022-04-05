let lastTimeStamp;
game.loop = (timeStamp) => {
  let elapsedTime = timeStamp - lastTimeStamp;
  lastTimeStamp = timeStamp;

  game.systemOrder.map((i) => {
    game.systems[i].update(elapsedTime, game.entities);
  });

  if (game.nextLevel) {
    game.loadLevel(game.nextLevel);
    game.nextLevel = false;
  }

  requestAnimationFrame(game.loop);
}

game.initialize = () => {
  [game.entities, game.config] = game.loadLevel(game.levels[0]);

  game.systemOrder = ["render", "physics", "gridSystem", "keyboardInput"];
  game.systems = {
    render: game.system.Render(game.graphics),
    physics: game.system.Physics(),
    gridSystem: game.system.GridSystem({...game.config}),
    keyboardInput: game.system.KeyboardInput(),
  };


  lastTimeStamp = performance.now()
  requestAnimationFrame(game.loop);
}
