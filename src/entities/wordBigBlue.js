game.createWordBigBlue = () => {
  const wordBigBlue = game.Entity();
  wordBigBlue.addComponent(game.components.Position({x: 0, y: 0}));
  wordBigBlue.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordBigBlue.sprite = game.graphics.Sprite({
    image: game.assets.wordBigBlue,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return wordBigBlue;
}
