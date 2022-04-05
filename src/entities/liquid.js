game.createLiquid = () => {
  // TODO: Split this into two entities: water and lava
  const liquid = game.Entity();
  liquid.addComponent(game.components.LoadPriority({priority: 5}));
  liquid.addComponent(game.components.Position({x: 0, y: 0}));
  liquid.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  liquid.addComponent(game.components.Alive());
  liquid.sprite = game.graphics.Sprite({
    image: game.assets.liquid,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return liquid;
}
