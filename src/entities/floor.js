game.createFloor = () => {
  const floor = game.Entity();
  floor.addComponent(game.components.Position({x: 0, y: 0}));
  floor.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  floor.sprite = game.graphics.Sprite({
    image: game.assets.floor,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return floor;
}
