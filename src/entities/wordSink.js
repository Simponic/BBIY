game.createWordSink = () => {
  const wordSink = game.Entity();
  wordSink.addComponent(game.components.Position({x: 0, y: 0}));
  wordSink.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordSink.sprite = game.graphics.Sprite({
    image: game.assets.wordSink,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return wordSink;
}
