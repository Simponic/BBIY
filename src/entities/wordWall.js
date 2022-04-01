game.createWordWall = () => {
  const wordWall = game.Entity();
  wordWall.addComponent(game.components.Position({x: 0, y: 0}));
  wordWall.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordWall.sprite = game.graphics.Sprite({
    image: game.assets.wordWall,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return wordWall;
}
