let lastTimeStamp;
game.loop = (timeStamp) => {
  let elapsedTime = timeStamp - lastTimeStamp;
  lastTimeStamp = timeStamp;

  game.systemOrder.map((i) => {
    game.systems[i].update(elapsedTime, game.entities);
  });

  requestAnimationFrame(game.loop);
}

game.initialize = () => {
  game.systemOrder = ["render", "physics", "gridSystem"];
  game.systems = {
    render: game.system.Render(game.graphics),
    physics: game.system.Physics(),
    gridSystem: game.system.GridSystem({
      xDim: 15,
      yDim: 15,
      canvasWidth: game.canvas.width,
      canvasHeight: game.canvas.height,
    }),
  };

  game.entities = {};

  Array(400).fill(null).forEach((_, i) => {
    const bigBlue = game.createBigBlue();
    bigBlue.addComponent(game.components.GridPosition({x: Math.floor(Math.random() * 15), y: Math.floor(Math.random() * 13)}));
    game.entities[bigBlue.id] = bigBlue;
  });

  game.rock = game.createRock();
  game.rock.addComponent(game.components.Position({x: 200, y: 200}));
  game.rock.addComponent(game.components.GridPosition({x: 0, y: 0}));
  game.entities[game.rock.id] = game.rock;

  lastTimeStamp = performance.now()
  requestAnimationFrame(game.loop);
}
