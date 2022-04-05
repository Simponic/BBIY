game.createWordStop = () => {
  const wordStop = game.Entity();
  wordStop.addComponent(game.components.LoadPriority({priority: 3}));
  wordStop.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordStop.addComponent(game.components.Pushable({pushable: true}));
  wordStop.addComponent(game.components.Alive());
  wordStop.sprite = game.sprites.wordStop;
  return wordStop;
}
