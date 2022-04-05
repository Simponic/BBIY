game.createBigBlue = () => {
  const bigBlue = game.Entity();
  bigBlue.addComponent(game.components.LoadPriority({priority: 1}));
  bigBlue.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  bigBlue.addComponent(game.components.Alive());
  bigBlue.sprite = game.sprites.bigBlue;
  
  // TODO: Remove this
  bigBlue.addComponent(game.components.Controllable({controls: ['left', 'right', 'up', 'down']}));

  return bigBlue;
}