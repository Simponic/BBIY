game.createWordSink = () => {
  const wordSink = game.Entity();
  wordSink.addComponent(game.components.LoadPriority({priority: 3}));
  wordSink.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordSink.sprite = game.sprites.wordSink;
  return wordSink;
}
