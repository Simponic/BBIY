game.createRock = () => {
  const rock = game.Entity();
  rock.addComponent(game.components.LoadPriority({priority: 2}));
  rock.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  rock.addComponent(game.components.Alive());
  rock.addComponent(game.components.Sprite({spriteName: "rock"}));;


//  rock.addComponent(game.components.Pushable());
  rock.addComponent(game.components.Name({selector: "rock"}));

  return rock;
};
