game.createWordLava = () => {
  const wordLava = game.Entity();
  wordLava.addComponent(game.components.Position({x: 0, y: 0}));
  wordLava.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordLava.sprite = game.graphics.Sprite({
    image: game.assets.wordLava,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return wordLava;
}
