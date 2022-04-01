game.createBigBlue = () => {
  const bigBlue = game.Entity();
  bigBlue.addComponent(game.components.Position({x: 0, y: 0}));
  bigBlue.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  bigBlue.sprite = game.graphics.Sprite({
    image: game.assets.bigblue,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return bigBlue;
}