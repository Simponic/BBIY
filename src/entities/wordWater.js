game.createWordWater = () => {
  const wordWater = game.Entity();
  wordWater.addComponent(game.components.LoadPriority({priority: 3}));
  wordWater.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordWater.addComponent(game.components.Pushable({pushable: true}));
  wordWater.addComponent(game.components.Alive());
  wordWater.addComponent(game.components.Sprite({spriteName: "wordWater"}))
  return wordWater;
}
