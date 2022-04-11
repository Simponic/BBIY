game.createHedge = () => {
  const hedge = game.Entity();
  hedge.addComponent(game.components.LoadPriority({priority: 6}));
  hedge.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  hedge.addComponent(game.components.Stop({stop: true}));
  hedge.addComponent(game.components.Alive());
  hedge.addComponent(game.components.Sprite({spriteName: "hedge"}))
  return hedge;
}
