game.createLava = () => {
  // TODO: Split this into two entities: water and lava
  const lava = game.Entity();
  lava.addComponent(game.components.LoadPriority({priority: 5}));
  lava.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  lava.addComponent(game.components.Alive());
  lava.sprite = game.graphics.Sprite({
    image: game.assets.lava,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return lava;
}
