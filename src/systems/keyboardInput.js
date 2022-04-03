game.system.KeyboardInput = () => {
  "use strict";
  const keys = {};
  const keyPress = (event) => {
    if (!event.repeat) {
      keys[event.key] = true;
    }
  };
  const update = (elapsedTime, entities) => {
    for (let id in entities) {
      const entity = entities[id];
      if (entity.hasComponent('controllable')) {
        const controls = entity.components.controllable.controls;
        if (controls.includes('left') && keys['ArrowLeft']) {
          entity.addComponent(game.components.Momentum({ dx: -1, dy: 0 }));
        } else if (controls.includes('right') && keys['ArrowRight']) {
          entity.addComponent(game.components.Momentum({ dx: 1, dy: 0 }));
        } else if (controls.includes('up') && keys['ArrowUp']) {
          entity.addComponent(game.components.Momentum({ dx: 0, dy: -1 }));
        } else if (controls.includes('down') && keys['ArrowDown']) {
          entity.addComponent(game.components.Momentum({ dx: 0, dy: 1 }));
        }

        Object.keys(keys).map((key) => delete keys[key]);
      }
    }
  };
  window.addEventListener("keydown", keyPress);
  return { keys, update };
}