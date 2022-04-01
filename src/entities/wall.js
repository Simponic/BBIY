game.createWall = () => {
  const wall = game.Entity();
  wall.addComponent(game.components.Position({x: 0, y: 0}));
  wall.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wall.sprite = game.graphics.Sprite({
    image: game.assets.wall,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return wall;
}
