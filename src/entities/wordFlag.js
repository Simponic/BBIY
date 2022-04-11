game.createWordFlag = () => {
  const wordFlag = game.Entity();
  wordFlag.addComponent(game.components.LoadPriority({priority: 3}));
  wordFlag.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordFlag.addComponent(game.components.Pushable({pushable: true}));
  wordFlag.addComponent(game.components.Alive());
  wordFlag.addComponent(game.components.Sprite({spriteName: "wordFlag"}))
  return wordFlag;
}
