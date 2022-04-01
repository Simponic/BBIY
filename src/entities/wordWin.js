game.createWordWin = () => {
  const wordWin = game.Entity();
  wordWin.addComponent(game.components.Position({x: 0, y: 0}));
  wordWin.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordWin.sprite = game.graphics.Sprite({
    image: game.assets.wordWin,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return wordWin;
}
