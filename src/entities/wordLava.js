game.createWordLava = () => {
  const wordLava = game.Entity();
  wordLava.addComponent(game.components.LoadPriority({priority: 3}));
  wordLava.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  wordLava.addComponent(game.components.Pushable({pushable: true}));

  wordLava.sprite = game.sprites.wordLava;
  return wordLava;
}
