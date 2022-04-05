game.createWordIs = () => {
  const wordIs = game.Entity();
  wordIs.addComponent(game.components.LoadPriority({priority: 3}));
  wordIs.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordIs.sprite = game.sprites.wordIs;
  return wordIs;
}
