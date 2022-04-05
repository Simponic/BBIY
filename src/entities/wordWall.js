game.createWordWall = () => {
  const wordWall = game.Entity();
  wordWall.addComponent(game.components.LoadPriority({priority: 3}));
  wordWall.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordWall.sprite = game.sprites.wordWall;
  return wordWall;
}
