game.createWordKill = () => {
  const wordKill = game.Entity();
  wordKill.addComponent(game.components.LoadPriority({priority: 3}));
  wordKill.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordKill.addComponent(game.components.Pushable({pushable: true}));
  wordKill.sprite = game.sprites.wordKill;
  return wordKill;
}
