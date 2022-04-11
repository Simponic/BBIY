game.createWordWall = () => {
  const wordWall = game.Entity();
  wordWall.addComponent(game.components.LoadPriority({priority: 3}));
  wordWall.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordWall.addComponent(game.components.Pushable({pushable: true}));
  wordWall.addComponent(game.components.Alive());
  wordWall.addComponent(game.components.Sprite({spriteName: "wordWall"}))
  return wordWall;
}
