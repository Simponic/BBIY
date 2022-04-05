game.createGrass = () => {
  const grass = game.Entity();
  grass.addComponent(game.components.LoadPriority({priority: 6}));
  grass.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  grass.sprite = game.sprites.grass;
  return grass;
}
