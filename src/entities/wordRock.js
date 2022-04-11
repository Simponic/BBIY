game.createWordRock = () => {
  const wordRock = game.Entity();
  wordRock.addComponent(game.components.LoadPriority({priority: 3}));
  wordRock.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordRock.addComponent(game.components.Pushable({pushable: true}));
  wordRock.addComponent(game.components.Alive());
  wordRock.addComponent(game.components.Sprite({spriteName: "wordRock"}))
  return wordRock;
}
