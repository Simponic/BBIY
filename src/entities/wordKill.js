game.createWordKill = () => {
  const wordKill = game.Entity();
  wordKill.addComponent(game.components.Position({x: 0, y: 0}));
  wordKill.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordKill.sprite = game.graphics.Sprite({
    image: game.assets.wordKill,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return wordKill;
}
