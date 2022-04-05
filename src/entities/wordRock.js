game.createWordRock = () => {
  const wordRock = game.Entity();
  wordRock.addComponent(game.components.LoadPriority({priority: 3}));
  wordRock.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordRock.sprite = game.sprites.wordRock;
  return wordRock;
}
