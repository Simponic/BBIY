game.createWordPush = () => {
  const wordPush = game.Entity();
  wordPush.addComponent(game.components.Position({x: 0, y: 0}));
  wordPush.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordPush.sprite = game.graphics.Sprite({
    image: game.assets.wordPush,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return wordPush;
}
