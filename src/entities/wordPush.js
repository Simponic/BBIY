game.createWordPush = () => {
  const wordPush = game.Entity();
  wordPush.addComponent(game.components.LoadPriority({priority: 3}));
  wordPush.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordPush.sprite = game.sprites.wordPush;
  return wordPush;
}
