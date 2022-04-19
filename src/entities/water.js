game.createWater = () => {
  const water = game.Entity();
  water.addComponent(game.components.LoadPriority({priority: 5}));
  water.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  water.addComponent(game.components.Alive());
  water.addComponent(game.components.Sprite({spriteName: "water"}))
  water.addComponent(game.components.Name({selector: "water"}))
  return water;
}
