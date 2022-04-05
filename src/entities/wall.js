game.createWall = () => {
  const wall = game.Entity();
  wall.addComponent(game.components.LoadPriority({priority: 3}));
  wall.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wall.addComponent(game.components.Stop({stop: true}));
  wall.addComponent(game.components.Alive());
  wall.sprite = game.sprites.wall;
  return wall;
}
