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

  game.rock = game.createRock();
  game.rock.components.position = game.components.Position({x: 200, y: 200});
  game.entities[game.rock.id] = game.rock;

  requestAnimationFrame(game.loop);
}
