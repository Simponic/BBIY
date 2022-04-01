game.createWordStop = () => {
  const wordStop = game.Entity();
  wordStop.addComponent(game.components.Position({x: 0, y: 0}));
  wordStop.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordStop.sprite = game.graphics.Sprite({
    image: game.assets.wordStop,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return wordStop;
}
