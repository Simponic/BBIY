game.createWordIs = () => {
  const wordIs = game.Entity();
  wordIs.addComponent(game.components.Position({x: 0, y: 0}));
  wordIs.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordIs.sprite = game.graphics.Sprite({
    image: game.assets.wordIs,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return wordIs;
}
