game.createGrass = () => {
  const grass = game.Entity();
  grass.addComponent(game.components.Position({x: 0, y: 0}));
  grass.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  grass.sprite = game.graphics.Sprite({
    image: game.assets.grass,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return grass;
}
