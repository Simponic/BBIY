game.createRock = () => {
  const rock = game.Entity();
  rock.addComponent(game.components.Position({x: 0, y: 0}));
  rock.addComponent(game.components.Appearance({rot: 0, width: 100, height: 100}));
  rock.sprite = game.graphics.Sprite({
    image: game.assets.rock,
    spriteHeight: 24,
    spriteWidth: 24,
    numFrames: 3,
    timePerFrame: 100,
  });
  return rock;
}
