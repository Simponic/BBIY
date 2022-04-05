game.createWordBigBlue = () => {
  const wordBigBlue = game.Entity();
  wordBigBlue.addComponent(game.components.LoadPriority({priority: 3}));
  wordBigBlue.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordBigBlue.addComponent(game.components.Pushable({pushable: true}));
  wordBigBlue.sprite = game.sprites.wordBigBlue;
  return wordBigBlue;
}
