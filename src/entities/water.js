game.createWater = () => {
  const water = game.Entity();
  water.addComponent(game.components.LoadPriority({priority: 5}));
  water.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  water.addComponent(game.components.Alive());
  water.sprite = game.graphics.Sprite({
    image: game.assets.water,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return water;
}
