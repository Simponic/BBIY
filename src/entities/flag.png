game.createFlag = () => {
  const flag = game.Entity();
  flag.addComponent(game.components.Position({x: 0, y: 0}));
  flag.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  flag.sprite = game.graphics.Sprite({
    image: game.assets.flag,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return flag;
}
