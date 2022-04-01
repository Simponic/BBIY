game.createHedge = () => {
  const hedge = game.Entity();
  hedge.addComponent(game.components.Position({x: 0, y: 0}));
  hedge.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  hedge.sprite = game.graphics.Sprite({
    image: game.assets.hedge,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return hedge;
}
