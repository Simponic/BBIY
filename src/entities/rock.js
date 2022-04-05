game.createRock = () => {
  const rock = game.Entity();
  rock.addComponent(game.components.LoadPriority({priority: 2}));
  rock.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  rock.sprite = game.sprites.rock;

  //TODO: Remove this
  rock.addComponent(game.components.Pushable());

  return rock;
}
