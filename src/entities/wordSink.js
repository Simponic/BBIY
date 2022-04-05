game.createWordSink = () => {
  const wordSink = game.Entity();
  wordSink.addComponent(game.components.LoadPriority({priority: 3}));
  wordSink.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordSink.addComponent(game.components.Pushable({pushable: true}));
  wordSink.addComponent(game.components.Alive());
  wordSink.sprite = game.sprites.wordSink;
  return wordSink;
}
