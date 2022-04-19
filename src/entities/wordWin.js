game.createWordWin = () => {
  const wordWin = game.Entity();
  wordWin.addComponent(game.components.LoadPriority({priority: 3}));
  wordWin.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordWin.addComponent(game.components.Pushable({pushable: true}));
  wordWin.addComponent(game.components.Alive());
  wordWin.addComponent(game.components.Sprite({spriteName: "wordWin"}));
  wordWin.addComponent(game.components.Verb({action: "win"}));
  return wordWin;
}
