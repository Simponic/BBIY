game.createWordSink = () => {
  const wordSink = game.Entity();
  wordSink.addComponent(game.components.LoadPriority({priority: 3}));
  wordSink.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordSink.addComponent(game.components.Pushable({pushable: true}));
  wordSink.addComponent(game.components.Alive());
  wordSink.addComponent(game.components.Sprite({spriteName: "wordSink"}));
  wordSink.addComponent(game.components.Verb({action: "sink"}));
  return wordSink;
}
