game.createBigBlue = () => {
  const bigBlue = game.Entity();
  bigBlue.addComponent(game.components.LoadPriority({priority: 1}));
  bigBlue.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  bigBlue.addComponent(game.components.Alive());
  bigBlue.addComponent(game.components.Sprite({spriteName: "bigBlue"}));
  

//  bigBlue.addComponent(game.components.Controllable({controls: ['left', 'right', 'up', 'down']}));
  bigBlue.addComponent(game.components.Name({selector: "bigblue"}));
  return bigBlue;
};
