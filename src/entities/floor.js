game.createFloor = () => {
  const floor = game.Entity();
  floor.addComponent(game.components.LoadPriority({priority: 5}));
  floor.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  floor.sprite = game.sprites.floor;
  return floor;
}
