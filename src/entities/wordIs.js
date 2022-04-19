game.createWordIs = () => {
  const wordIs = game.Entity();
  wordIs.addComponent(game.components.LoadPriority({priority: 3}));
  wordIs.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  // wordIs.addComponent(game.components.Stop({stop: true}));
  wordIs.addComponent(game.components.Pushable());
  wordIs.addComponent(game.components.Alive());
  wordIs.addComponent(game.components.Sprite({spriteName: "wordIs"}));
  wordIs.addComponent(game.components.Verb({action: "Is"}));
  return wordIs;
};
