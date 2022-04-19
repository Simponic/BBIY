game.createFlag = () => {
  const flag = game.Entity();
  flag.addComponent(game.components.LoadPriority({priority: 5}));
  flag.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  flag.addComponent(game.components.Alive());
  flag.addComponent(game.components.Sprite({spriteName: "flag"}))
  flag.addComponent(game.components.Name({selector: "flag"}));

  flag.addComponent(game.components.Burnable());
  flag.addComponent(game.components.Sinkable());
  return flag;
}
