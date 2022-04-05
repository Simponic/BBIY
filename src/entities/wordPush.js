game.createWordPush = () => {
  const wordPush = game.Entity();
  wordPush.addComponent(game.components.LoadPriority({priority: 3}));
  wordPush.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordPush.addComponent(game.components.Pushable({pushable: true}));
  wordPush.sprite = game.sprites.wordPush;
  return wordPush;
}
