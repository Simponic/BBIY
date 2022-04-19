game.system.KeyboardInput = () => {
  "use strict";
  const keys = {};
  const keyPress = (event) => {
    if (!event.repeat) {
      keys[event.key] = true;
    }
  };
  const removeKey = (event) => {
    delete keys[event.key];
  };
  const update = (elapsedTime, entities, changedIds) => {
    for (let id in entities) {
      const entity = entities[id];
      if (entity.hasComponent('controllable') && entity.hasComponent('alive')) {
        const controls = entity.components.controllable.controls;
        if (!changedIds.has(entity.id)) {
          if (controls.includes('left') && keys[game.controls.left]) {
            entity.addComponent(game.components.Momentum({ dx: -1, dy: 0 }));
          } else if (controls.includes('right') && keys[game.controls.right]) {
            entity.addComponent(game.components.Momentum({ dx: 1, dy: 0 }));
          } else if (controls.includes('up') && keys[game.controls.up]) {
            entity.addComponent(game.components.Momentum({ dx: 0, dy: -1 }));
          } else if (controls.includes('down') && keys[game.controls.down]) {
            entity.addComponent(game.components.Momentum({ dx: 0, dy: 1 }));
          }
        }
      }
    }
    if (keys[game.controls.undo]) {
      game.systems.undo.undo(entities);
    }
    if (keys[game.controls.reset]) {
      game.loadLevelIndex(game.level);
    }
    if (keys["Escape"]) {
      game.systems.menu.bringUpMenu();
    }
    Object.keys(keys).map((key) => delete keys[key]);

    return new Set();
  };
  window.addEventListener("keydown", keyPress);
  window.addEventListener("keyup", removeKey);
  return { keys, update };
}
