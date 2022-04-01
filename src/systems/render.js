game.systems = {};
game.systems.Render = ((graphics) => {
  const renderEntities = (elapsedTime, entities) => {
    for (let id in entities) {
      const entity = entities[id];
      if (entity.sprite && entity.components.position && entity.components.appearance) {
//        document.getElementById("game-canvas").getContext("2d").drawImage(game.assets.bigblue, 100, 100, 100, 100);
        entity.sprite.draw(elapsedTime, {...entity.components.position, ...entity.components.appearance});
      }
    }
  }

  const update = (elapsedTime) => {
    graphics.clear();
    renderEntities(elapsedTime, game.entities);
  }
  return { update };
})(game.graphics);