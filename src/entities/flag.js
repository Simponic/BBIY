game.createFlag = () => {
  const flag = game.Entity();
  flag.addComponent(game.components.LoadPriority({priority: 2}));
  flag.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  flag.addComponent(game.components.Alive());
  flag.sprite = game.sprites.flag;
  return flag;
}
