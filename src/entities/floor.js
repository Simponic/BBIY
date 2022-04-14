game.createFloor = () => {
  const floor = game.Entity();
  floor.addComponent(game.components.LoadPriority({priority: 6}));
  floor.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  floor.addComponent(game.components.Alive());
  floor.addComponent(game.components.Sprite({spriteName: "floor"}))
  return floor;
}
