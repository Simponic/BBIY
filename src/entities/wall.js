game.createWall = () => {
  const wall = game.Entity();
  wall.addComponent(game.components.LoadPriority({priority: 3}));
  wall.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
//  wall.addComponent(game.components.Stop());
  wall.addComponent(game.components.Name({selector: "wall"}));
  wall.addComponent(game.components.Alive());
  wall.addComponent(game.components.Sprite({spriteName: "wall"}));

  wall.addComponent(game.components.Burnable());
  wall.addComponent(game.components.Sinkable());
  return wall;
};
