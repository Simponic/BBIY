game.loop = (elapsedTime) => {
  game.systems.Render.update(elapsedTime);

  requestAnimationFrame(game.loop);
}

game.initialize = () => {
  game.entities = {};
  game.bigBlue = game.createBigBlue();
  game.entities[game.bigBlue.id] = game.bigBlue;
  game.bigBlue2 = game.createBigBlue();
  game.bigBlue2.components.position = game.components.Position({x: 200, y: 100});
  game.entities[game.bigBlue2.id] = game.bigBlue2;
  requestAnimationFrame(game.loop);
}
