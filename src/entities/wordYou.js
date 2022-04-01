game.createWordYou = () => {
  const wordYou = game.Entity();
  wordYou.addComponent(game.components.Position({x: 0, y: 0}));
  wordYou.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordYou.sprite = game.graphics.Sprite({
    image: game.assets.wordYou,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return wordYou;
}
