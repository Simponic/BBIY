game.createGrass = () => {
  const grass = game.Entity();
  grass.addComponent(game.components.LoadPriority({priority: 6}));
  grass.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  grass.addComponent(game.components.Alive());
  grass.addComponent(game.components.Sprite({spriteName: "grass"}))
  return grass;
}
