game.createWordWater = () => {
  const wordWater = game.Entity();
  wordWater.addComponent(game.components.Position({x: 0, y: 0}));
  wordWater.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordWater.sprite = game.graphics.Sprite({
    image: game.assets.wordWater,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return wordWater;
}
