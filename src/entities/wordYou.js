game.createWordYou = () => {
  const wordYou = game.Entity();
  wordYou.addComponent(game.components.LoadPriority({priority: 3}));
  wordYou.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordYou.addComponent(game.components.Pushable({pushable: true}));
  wordYou.addComponent(game.components.Alive());
  wordYou.sprite = game.sprites.wordYou;
  return wordYou;
}
