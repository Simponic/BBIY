game.createWordRock = () => {
  const wordRock = game.Entity();
  wordRock.addComponent(game.components.Position({x: 0, y: 0}));
  wordRock.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordRock.sprite = game.graphics.Sprite({
    image: game.assets.wordRock,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return wordRock;
}
