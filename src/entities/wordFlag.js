game.createWordFlag = () => {
  const wordFlag = game.Entity();
  wordFlag.addComponent(game.components.Position({x: 0, y: 0}));
  wordFlag.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordFlag.sprite = game.graphics.Sprite({
    image: game.assets.wordFlag,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return wordFlag;
}
