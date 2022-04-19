game.createLava = () => {
  const lava = game.Entity();
  lava.addComponent(game.components.LoadPriority({priority: 6}));
  lava.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  lava.addComponent(game.components.Alive());
  lava.addComponent(game.components.Sprite({spriteName: "lava"}))
  lava.addComponent(game.components.Name({selector: "lava"}));
  return lava;
}
